import { fail, type Actions, redirect } from '@sveltejs/kit';
import { errorHandler, errorHandlerSync } from '$lib/server/errorHandler';

import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import prisma from '$lib/server/prisma';

const ChangePasswordSchema = z
	.object({
		username: z.string().max(50).trim(),
		password: z.string().min(8).max(30).trim(),
		confirmPassword: z.string().min(8).max(30).trim()
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export async function load(event) {
	return { id: event.locals.user?.id };
}

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		const [res, resError] = errorHandlerSync(() => ChangePasswordSchema.parse(formData));
		if (!res || resError) {
			if (resError instanceof z.ZodError) {
				const { fieldErrors: errors } = resError.flatten();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, confirmPassword, ...rest } = formData;

				return {
					data: rest,
					errors
				};
			} else return fail(400, { message: 'Invalid request' });
		}

		const { password, username } = res;
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const hashedPassword = await new Argon2id().hash(password);

		const userRes = await errorHandler(
			prisma.user.update({
				where: {
					id: event.locals.user.id
				},
				data: {
					password: hashedPassword,
					username
				}
			})
		);
		if (userRes[1]) return fail(500, { message: 'Internal server error' });

		redirect(302, '/');
	}
};
