import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { Argon2id } from 'oslo/password';
import { request } from 'http';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const now = new Date();
	const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	try {
		const res = await prisma.class.findUnique({
			where: {
				id: Number(id)
			},
			include: {
				userClass: {
					include: {
						user: {
							select: {
								id: true,
								username: true
							}
						}
					}
				},
				UserActivities: {
					where: {
						doneAt: {
							gte: startOfDay,
							lte: endOfDay
						}
					},
					include: {
						actionType: true,
						user: {
							select: {
								id: true,
								username: true
							}
						}
					}
				}
			}
		});
		return { userClass: res };
	} catch (error) {
		throw fail(500, { message: 'An error occured while fetching class.' });
	}
};

export const actions: Actions = {
	addStudent: async (event) => {
		const id = event.params.id;
		const request = await event.request.formData();
		const studentId = request.get('studentId');

		if (!studentId) {
			return fail(400, { message: 'Invalid Input.' });
		}

		const studentIdArr = studentId.toString().split(/\W+/);

		try {
			const registeredStudent = await prisma.user.findMany({
				where: {
					id: {
						in: studentIdArr
					}
				},
				select: {
					id: true
				}
			});

			const distinctData = studentIdArr.filter((n, i) => studentIdArr.indexOf(n) === i);

			let filterStudentId = distinctData.filter(
				(id) => !registeredStudent.some((student) => student.id === id)
			);

			await Promise.all(
				filterStudentId.map(async (idStudent) => {
					if (typeof idStudent === 'string') {
						const hashedPassword = await new Argon2id().hash(idStudent);
						idStudent = idStudent.trim();
						if (idStudent) {
							await prisma.$transaction([
								prisma.user.create({
									data: {
										id: idStudent.toString(),
										username: idStudent.toString(),
										password: hashedPassword,
										role: 'user'
									}
								})
							]);
						}
					}
				})
			);

			const userClass = await prisma.userClass.findMany({
				where: {
					classId: Number(id),
					userId: {
						in: studentIdArr
					}
				}
			});

			filterStudentId = distinctData.filter(
				(id) => !userClass.some((student) => student.userId === id)
			);

			filterStudentId.forEach(async (idStudent) => {
				if (typeof idStudent === 'string') {
					idStudent = idStudent.trim();
					if (idStudent) {
						await prisma.$transaction([
							prisma.userClass.create({
								data: {
									userId: idStudent.toString(),
									classId: Number(id)
								}
							})
						]);
					}
				}
			});
			return { message: 'Students added successfully.' };
		} catch (error) {
			return fail(500, { message: 'An error occured while adding students.' });
		}
	},
	removeUser: async (event) => {
		const request = await event.request.formData();
		const id = request.get('id');

		if (!id) {
			return fail(400, { message: 'Invalid Input.' });
		}

		try {
			const res = await prisma.$transaction([
				prisma.userClass.delete({
					where: {
						id: Number(id)
					}
				})
			]);

			return { res };
		} catch (error) {
			return fail(500, { message: 'An error occured while deleting assignment.' });
		}
	},
	removeAsg: async (event) => {
		const request = await event.request.formData();
		const id = request.get('asgId');

		if (!id) {
			return fail(400, { message: 'Invalid Input.' });
		}

		try {
			const res = await prisma.$transaction([
				prisma.userActivities.deleteMany({
					where: {
						id: Number(id)
					}
				})
			]);
			return { res };
		} catch (error) {
			return fail(500, { message: 'An error occured while deleting assignment.' });
		}
	}
};
