import { error, redirect } from '@sveltejs/kit';

export function load(event) {
	if (!event.locals.user) {
		if (event.url.pathname !== '/login') throw redirect(302, '/login');
		return;
	}

	if (event.locals.user.role === 'admin') {
		if (!event.url.pathname.startsWith('/admin')) throw redirect(301, '/admin');
	}

	const session = event.locals.session;
	if (!session) throw error(401, 'Unauthorized');

	return { user: event.locals.user, session };
}
