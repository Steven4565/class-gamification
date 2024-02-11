export function load(event) {
	return {
		username: event.locals.user?.username
	};
}
