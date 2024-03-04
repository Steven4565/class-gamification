import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { Argon2id } from 'oslo/password';
import { errorHandler } from '$lib/server/errorHandler';
import type { Prisma } from '@prisma/client';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;
	const [res, resError] = await errorHandler(
		prisma.class.findUnique({
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
		})
	);

	if (!res || resError) error(500, { message: 'An error occured while fetching class.' });
	return { userClass: res };
};

export const actions: Actions = {
	addStudent: async (event) => {
		const id = event.params.id;
		const request = await event.request.formData();
		const studentId = request.get('studentId');

		if (!studentId) return fail(400, { message: 'Invalid Input.' });

		const studentIdArr = studentId.toString().split(/\W+/);

		// remove student id that are already registered
		const [registeredStudent, registeredStudentError] = await errorHandler(
			prisma.user.findMany({
				where: {
					id: {
						in: studentIdArr
					}
				},
				select: {
					id: true
				}
			})
		);
		if (registeredStudentError || !registeredStudent)
			return fail(500, { message: 'An error occured while fetching student.' });
		const distinctData = studentIdArr.filter((n, i) => studentIdArr.indexOf(n) === i);

		// Unregistered students
		const unregisteredStudents = distinctData.filter(
			(id) => !registeredStudent.some((student) => student.id === id)
		);

		// Create user data
		const argon = new Argon2id();
		const promiseArray = unregisteredStudents.map(async (stud) => {
			const hashedPassword = await argon.hash(stud);
			stud = stud.trim();
			return {
				id: stud,
				username: stud,
				password: hashedPassword,
				role: 'user'
			};
		});
		const studentData = await Promise.all(promiseArray);
		if (!studentData) return fail(500, { message: 'An error occured while adding student.' });

		// Add students to database
		const createRes = await errorHandler(
			prisma.user.createMany({
				data: studentData
			})
		);
		if (createRes[1]) return fail(500, { message: 'An error occured while adding student.' });

		// Get user classes
		const [userClass, useClassError] = await errorHandler(
			prisma.userClass.findMany({
				where: {
					classId: Number(id),
					userId: {
						in: studentIdArr
					}
				}
			})
		);
		if (useClassError || !userClass)
			return fail(500, { message: 'An error occured while adding student.' });

		// I have no clue what this does
		const distinctUserIdsNotInClass = distinctData.filter(
			(id) => !userClass.some((student) => student.userId === id)
		);

		// Add already existing students to the class

		const studentData2 = distinctUserIdsNotInClass.map((idStudent) => {
			idStudent = idStudent.trim();
			return {
				userId: idStudent,
				classId: Number(id)
			};
		});
		const createRes2 = await errorHandler(
			prisma.userClass.createMany({
				data: studentData2
			})
		);

		if (createRes2[1]) return fail(500, { message: 'An error occured while adding student.' });

		return { message: 'Students added successfully.' };
	},
	removeAsg: async (event) => {
		const request = await event.request.formData();
		const id = request.get('asgId');

		if (!id) {
			return error(400, { message: 'Invalid Input.' });
		}

		try {
			const res = await prisma.$transaction([
				prisma.userActivities.delete({
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
