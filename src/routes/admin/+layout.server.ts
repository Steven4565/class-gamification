import { fail } from '@sveltejs/kit';

export function load(event) {
	if (!event.locals.isAdmin) {
		throw fail(400, { message: 'Not an admin' });
	}
}
