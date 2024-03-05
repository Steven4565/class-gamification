import { redirect } from '@sveltejs/kit';

export function load(event) {
	if (!event.locals.user) {
		if (event.url.pathname !== '/login') redirect(302, '/login');
		return;
	}

	if (event.locals.user.role === 'admin') {
		if (!event.url.pathname.startsWith('/admin')) redirect(301, '/admin');
	}
	return { user: event.locals.user };
}
