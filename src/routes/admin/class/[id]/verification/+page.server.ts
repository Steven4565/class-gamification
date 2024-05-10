import type { Actions, PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';
import { userActivityQuery } from '$lib/types/verificationTable';
import type { TableUserActivity } from '$lib/types/verificationTable';
import { fail } from '@sveltejs/kit';
import { errorHandler } from '$lib/server/errorHandler';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const res: TableUserActivity[] = await prisma.userActivities.findMany({
		where: {
			classId: Number(id)
		},
		...userActivityQuery
	});

	return { userActivities: res };
};

export const actions: Actions = {
	invalidate: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) return fail(400, { message: 'Invalid request' });

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, err] = await errorHandler(
			prisma.userActivities.update({
				where: {
					id
				},
				data: {
					valid: false
				}
			})
		);

		if (err) {
			console.error(err);
			return fail(400, { message: 'Internal server error' });
		}
	}
};
