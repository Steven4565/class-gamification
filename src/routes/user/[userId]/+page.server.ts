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
	const user = await prisma.user.findFirst({
		where: { id: event.params.userId },
		include: { userClass: true }
	});
	if (!user) error(400, { message: 'User not found' });

	const { classes, classProp } = await getClasses(user.id);
	if (!classes) error(400, { message: 'User has not joined any classes' });

	const classIdParams = event.url.searchParams.get('classId');
	if (classIdParams === null) redirect(300, `/user/${user.id}?classId=${classes[0].classId}`);

	const classId = parseInt(classIdParams);
	if (Number.isNaN(classId)) error(400, { message: 'Invalid classId' });

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
}
