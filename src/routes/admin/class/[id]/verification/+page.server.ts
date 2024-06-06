import type { Actions, PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';
import { userActivityQuery } from '$lib/types/verificationTable';
import type { TableUserActivity } from '$lib/types/verificationTable';
import { fail, json } from '@sveltejs/kit';
import { errorHandler } from '$lib/server/errorHandler';

export const load = async (event) => {
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
	validateAsg: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');
		const valid = request.get('valid');

		const [result, resError] = await errorHandler(
			prisma.userActivities.update({
				where: {
					id: Number(id)
				},
				data: {
					valid: valid == 'true' ? false : true
				}
			})
		);
		if (!result || resError)
			return fail(500, { message: 'An error occured while updating class.' });
		return { result };
    }
};
