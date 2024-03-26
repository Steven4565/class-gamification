import { errorHandler } from '$lib/server/errorHandler.js';
import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

export async function load(event) {
	// TODO: Please clean this up. This is a mess

	if (!event.locals.user) {
		if (event.url.pathname !== '/login') redirect(302, '/login');
		return;
	}

	if (event.locals.user.role === 'admin') {
		if (!event.url.pathname.startsWith('/admin')) redirect(301, '/admin');
	}

	const session = event.locals.session;
	if (!session) throw error(401, 'Unauthorized');

	// TODO: add error handling here
	const user = await prisma.user.findFirst({
		where: { id: event.locals.user.id }
	});
	if (!user) error(401, 'Unauthorized');

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

	const [classData, classError] = await errorHandler(
		prisma.userClass.findMany({
			where: {
				userId: user.id
			},
			include: {
				class: true
			}
		})
	);
	if (classError) {
		console.error(classError);
		error(500, { message: 'Internal server error' });
	}

	const classes = classData?.map((c) => {
		return {
			classId: c.classId,
			name: c.class.name
		};
	});

	return { user: event.locals.user, session, classes };
}
