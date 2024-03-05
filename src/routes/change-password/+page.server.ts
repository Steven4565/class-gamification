import prisma from '$lib/server/prisma.js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

import { z } from 'zod';

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

		console.log(formData);

		// TODO: add error handling
		try {
			const { username, password, confirmPassword } = ChangePasswordSchema.parse(formData);
		} catch (e) {
			if (e instanceof z.ZodError) {
				const { fieldErrors: errors } = e.flatten();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, confirmPassword, ...rest } = formData;

				return {
					data: rest,
					errors
				};
			}
		}

		// if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		// if (!password || password !== confirmPassword)
		// 	return fail(400, { message: 'Passwords do not match' });

		// if (!username) return fail(400, { message: 'Invalid username' });

		// const hashedPassword = await new Argon2id().hash(password);

		// // TODO: error handling
		// await prisma.user.update({
		// 	where: {
		// 		id: event.locals.user.id
		// 	},
		// 	data: {
		// 		password: hashedPassword,
		// 		username
		// 	}
		// });

		redirect(302, '/');
	}
};
