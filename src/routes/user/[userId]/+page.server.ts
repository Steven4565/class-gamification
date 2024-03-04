import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';

async function getClasses(userId: string) {
	const classes = await prisma.userClass.findMany({
		where: {
			userId
		},
		include: {
			class: true
		}
	});
	const classProp = classes.map((c) => {
		return {
			value: c.classId.toString(),
			name: c.class.name
		};
	});
	return { classes, classProp };
}

export async function load(event) {
	let classUrl = '';

	try {
		// load user
		const user = await prisma.user.findFirst({
			where: { id: event.params.userId },
			include: { userClass: true }
		});
		if (!user) throw Error('UserNotFound');

		// load classes
		const { classes, classProp } = await getClasses(user.id);
		if (!classes) throw Error('NoClassesJoined');

		// redirect user to first class
		const classIdParams = event.url.searchParams.get('classId');
		classUrl = `/user/${user.id}?classId=${classes[0].classId}`;
		if (classIdParams === null) throw Error('RedirectToFirstClass');

		// check valid class ID
		const classId = parseInt(classIdParams);
		if (Number.isNaN(classId)) throw Error('InvalidClassId');

		// load user activities
		const userActivities = prisma.userActivities.findMany({
			where: {
				userId: user.id,
				classId
			},
			include: {
				actionType: true
			}
		});

		const exp = (await userActivities).reduce((exp, { actionType }) => {
			return exp + actionType.experience;
		}, 0);

		const actions = await prisma.userActivities.findMany({
			where: {
				userId: user.id,
				classId
			},
			include: {
				actionType: true
			}
		});

		return {
			user: { ...event.locals.user, exp },
			actions,
			classProp,
			classes
		};
	} catch (e) {
		if (e instanceof Error)
			switch (e.message) {
				case 'UserNotFound':
					error(400, { message: 'User not found' });
					break;
				case 'NoClassesJoined':
					error(400, { message: 'No classes joined' });
					break;
				case 'RedirectToFirstClass':
					redirect(300, classUrl);
					break;
				case 'InvalidClassId':
					error(400, { message: 'Invalid classId' });
					break;

				default:
					console.error(e);
					error(500, { message: 'Internal server error' });
			}
	}
}
