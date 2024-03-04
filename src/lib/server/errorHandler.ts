export async function errorHandler<T>(promise: Promise<T>): Promise<[T | null, unknown]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return [null, e];
	}
}
