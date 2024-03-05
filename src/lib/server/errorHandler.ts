export async function errorHandler<T>(promise: Promise<T>): Promise<[T | null, unknown]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return [null, e];
	}
}

export function errorHandlerSync<T>(fn: () => T): [T | null, unknown] {
	try {
		const data = fn();
		return [data, null];
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return [null, e];
	}
}
