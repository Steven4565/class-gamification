import { redirect } from '@sveltejs/kit';

export function load(event) {
	if (!event.locals.user) {
		if (event.url.pathname !== '/login') throw redirect(302, '/login');
		return;
	}

	if (event.locals.user.name === 'admin') {
		if (!event.url.pathname.startsWith('/admin')) throw redirect(301, '/admin');
	}
	return { name: event.locals.user.name };
}
