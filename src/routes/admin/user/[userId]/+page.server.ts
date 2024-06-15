import { errorHandler } from '$lib/server/errorHandler';
import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { calculateCurrentLevel, getClasses } from '$lib/components/user/getUserData';

export async function load({ params: { userId }, url }) {
	// load user
	const [user, userError] = await errorHandler(
		prisma.user.findFirst({
			where: { id: userId },
			include: { userClass: true }
		})
	);
	if (userError || !user) error(400, { message: 'User not found' });

	// load classes
	const [classRes, classError] = await errorHandler(getClasses(userId));
	if (classError || !classRes) error(400, { message: 'No classes joined' });
	const { classes } = classRes;

	// redirect user to first class
	const classIdParams = url.searchParams.get('classId');
	const classUrl = `/admin/user/${userId}?classId=${classes[0].classId}`;
	if (classIdParams === null) {
		redirect(301, classUrl);
	}

	// check valid class ID
	const classId = parseInt(classIdParams);
	if (Number.isNaN(classId)) error(400, { message: 'Invalid classId' });

	// load user activities
	const [userActivities, userActivitiesError] = await errorHandler(
		prisma.userActivities.findMany({
			where: {
				userId,
				classId
			},
			include: {
				actionType: true
			}
		})
	);
	if (!userActivities || userActivitiesError) error(500, { message: 'Activities not found' });

	// calculate experience
	const exp = userActivities.reduce((exp, { actionType }) => {
		return exp + actionType.experience;
	}, 0);

	// get user actions
	const [actions, actionsError] = await errorHandler(
		prisma.userActivities.findMany({
			where: {
				userId,
				classId
			},
			include: {
				actionType: true
			}
		})
	);
	if (!actions || actionsError) error(500, { message: 'Actions not found' });

	// get current level
	const [levels, levelsError] = await errorHandler(
		prisma.level.findMany({
			orderBy: {
				experience: 'desc'
			}
		})
	);
	if (!levels || levelsError) error(500, { message: 'Levels not found' });

	const { currExp, nextExp, title } = calculateCurrentLevel(levels, exp);

	return {
		user: { ...user, exp, title: 'testTitle' },
		actions,
		currExp,
		nextExp,
		title,
		classes: classes.map((c) => {
			return {
				name: c.class.name,
				classId: c.class.id
			};
		})
	};
}
