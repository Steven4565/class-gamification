import prisma from '$lib/server/prisma.js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

export async function load(event) {
	return { id: event.locals.user?.id };
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username')?.toString();
		const password = formData.get('password')?.toString();
		const confirmPassword = formData.get('confirmPassword');

		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		if (!password || password !== confirmPassword)
			return fail(400, { message: 'Passwords do not match' });

		if (!username) return fail(400, { message: 'Invalid username' });

		const hashedPassword = await new Argon2id().hash(password);

		// TODO: error handling
		await prisma.user.update({
			where: {
				id: event.locals.user.id
			},
			data: {
				password: hashedPassword,
				username
			}
		});

		redirect(302, '/');
	}
};
