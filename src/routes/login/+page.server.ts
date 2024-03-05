import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

import type { Actions } from './$types';
import prisma from '$lib/server/prisma';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		const password = formData.get('password');

		if (typeof id !== 'string') {
			return fail(400, {
				message: 'Invalid id'
			});
		}
		if (typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		let isAdmin = false;
		try {
			const existingUser = await prisma.user.findFirst({
				where: {
					id: username.toLowerCase()
				}
			});
			if (!existingUser) {
				return fail(400, {
					message: 'Incorrect username or password'
				});
			}

			const validPassword = await new Argon2id().verify(existingUser.password, password);
			if (!validPassword) {
				return fail(400, {
					message: 'Incorrect username or password'
				});
			}

			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			if (existingUser.role === 'admin') isAdmin = true;
			isAdmin = false;
		} catch (e) {
			console.error(e);
			return fail(500, {
				message: 'Internal server error'
			});
		}

		if (isAdmin) redirect(302, '/admin');
		else redirect(302, '/');
	}
};
