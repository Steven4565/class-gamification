import { errorHandler } from '$lib/server/errorHandler.js';
import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

export async function load(event) {
	// TODO: Please clean this up. This is a mess

	if (event.url.pathname.startsWith('/login')) return;
	if (!event.locals.user) redirect(302, '/login');

	if (event.url.pathname.startsWith('/admin')) {
		if (event.locals.user.role !== 'admin') redirect(301, '/');
	}

	const session = event.locals.session;
	if (!session) throw error(401, 'Unauthorized');

	const [user, userError] = await errorHandler(
		prisma.user.findFirst({
			where: { id: event.locals.user.id }
		})
	);
	if (!user || userError) error(401, 'Unauthorized');

	// Only allow to change password if the user has the default password
	const isDefaultPassword = await new Argon2id().verify(user.password, user.id);
	if (
		user.role !== 'admin' &&
		isDefaultPassword &&
		!event.url.pathname.startsWith('/change-password')
	)
		redirect(302, '/change-password');
	else if (!isDefaultPassword && event.url.pathname.startsWith('/change-password'))
		redirect(302, '/');

	return { user: event.locals.user, session };
}
