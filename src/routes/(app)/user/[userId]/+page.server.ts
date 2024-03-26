import { errorHandler } from '$lib/server/errorHandler';
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
	// load user
	const [user, userError] = await errorHandler(
		prisma.user.findFirst({
			where: { id: event.params.userId },
			include: { userClass: true }
		})
	);
	if (userError || !user) error(400, { message: 'User not found' });

	// load classes
	const [classRes, classError] = await errorHandler(getClasses(user.id));
	if (classError || !classRes) error(400, { message: 'No classes joined' });
	const { classes, classProp } = classRes;

	// redirect user to first class
	const classIdParams = event.url.searchParams.get('classId');
	const classUrl = `/user/${user.id}?classId=${classes[0].classId}`;
	if (classIdParams === null) redirect(300, classUrl);

	// check valid class ID
	const classId = parseInt(classIdParams);
	if (Number.isNaN(classId)) error(400, { message: 'Invalid classId' });

	// load user activities
	const [userActivities, userActivitiesError] = await errorHandler(
		prisma.userActivities.findMany({
			where: {
				userId: user.id,
				classId
			},
			include: {
				actionType: true
			}
		})
	);
	if (!userActivities || userActivitiesError) error(500, { message: 'Activities not found' });

	const exp = userActivities.reduce((exp, { actionType }) => {
		return exp + actionType.experience;
	}, 0);

	const [actions, actionsError] = await errorHandler(
		prisma.userActivities.findMany({
			where: {
				userId: user.id,
				classId
			},
			include: {
				actionType: true
			}
		})
	);
	if (!actions || actionsError) error(500, { message: 'Actions not found' });

	return {
		user: { ...event.locals.user, exp },
		actions,
		classProp,
		classes
	};
}
