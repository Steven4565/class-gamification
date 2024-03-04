import { fail, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';
import type { ClassData } from '$lib/types/classData';
import { errorHandler } from '$lib/server/errorHandler';

export const load: PageServerLoad = async () => {
	const [data, dataError] = await errorHandler(
		prisma.class.findMany({
			include: {
				_count: {
					select: { userClass: true }
				}
			}
		})
	);
	if (!data || dataError) error(500, { message: 'An error occured while fetching classes.' });

	const res: ClassData[] = data.map((item) => ({
		...item,
		userCount: item._count.userClass
	}));
	return { res };
};

export const actions: Actions = {
	addClass: async (event) => {
		const request = await event.request.formData();
		const name = request.get('name');
		const description = request.get('description');

		if (!name || typeof name !== 'string' || !description || typeof description !== 'string') {
			return fail(400, { message: 'Invalid Input.' });
		}

		const [result, resError] = await errorHandler(
			prisma.class.create({
				data: {
					name: name,
					description: description
				}
			})
		);
		if (!result || resError)
			return fail(500, { message: 'An error occured while creating class.' });

		return { result };
	},
	removeClass: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');

		if (!id) return error(400, { message: 'Invalid Input.' });

		const [result, resError] = await errorHandler(
			prisma.class.delete({
				where: {
					id: Number(id)
				}
			})
		);
		if (!result || resError)
			return fail(500, { message: 'An error occured while deleting class.' });
		return { result };
	},
	updateClass: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');
		const name = request.get('name');
		const description = request.get('description');

		if (
			!id ||
			!name ||
			typeof id !== 'string' ||
			typeof name !== 'string' ||
			!description ||
			typeof description !== 'string'
		)
			return fail(400, { message: 'Invalid Input.' });

		const [result, resError] = await errorHandler(
			prisma.class.update({
				where: {
					id: Number(id)
				},
				data: {
					name: name,
					description: description
				}
			})
		);
		if (!result || resError)
			return fail(500, { message: 'An error occured while updating class.' });
		return { result };
	}
};
