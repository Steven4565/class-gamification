import { redirect, fail, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';

type ClassData = {
	id: number;
	name: string;
	description: string;
	userCount: number;
};

export const load: PageServerLoad = async (event) => {
	try {
		const data = await prisma.class.findMany({
			include: {
				_count: {
					select: { userClass: true }
				}
			}
		});
		const res: ClassData[] = data.map((item) => ({
			...item,
			userCount: item._count.userClass
		}));
		return { res };
	} catch (error) {
		return fail(500, { message: 'An error occured while fetching classes.' });
	}
};

export const actions: Actions = {
	addClass: async (event) => {
		const request = await event.request.formData();
		const name = request.get('name');
		const description = request.get('description');

		if (!name || typeof name !== 'string' || !description || typeof description !== 'string') {
			return error(400, { message: 'Invalid Input.' });
		}

		try {
			const result = await prisma.$transaction([
				prisma.class.create({
					data: {
						name: name,
						description: description
					}
				})
			]);
			return { result };
		} catch (error) {
			return fail(500, { message: 'An error occured while creating class.' });
		}
	},
	removeClass: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');

		if (!id) {
			return error(400, { message: 'Invalid Input.' });
		}

		try {
			const result = await prisma.$transaction([
				prisma.class.delete({
					where: {
						id: Number(id)
					}
				})
			]);
			return { result };
		} catch (error) {
			return fail(500, { message: 'An error occured while deleting class.' });
		}
	},
	updateClass: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');
		const name = request.get('name');
		const subject = request.get('subject');
		const description = request.get('description');

		if (
			!id ||
			!name ||
			typeof id !== 'string' ||
			typeof name !== 'string' ||
			!description ||
			typeof description !== 'string'
		) {
			return error(400, { message: 'Invalid Input.' });
		}

		try {
			const result = await prisma.$transaction([
				prisma.class.update({
					where: {
						id: Number(id)
					},
					data: {
						name: name,
						description: description
					}
				})
			]);
			return { result };
		} catch (error) {
			return fail(500, { message: 'An error occured while updating class.' });
		}
	}
};
