import prisma from '$lib/server/prisma';

export async function load(event) {
	const user = await prisma.user.findFirst({
		where: { id: event.params.userId },
		include: { userClass: true }
	});
	if (!user) throw new Error('User not found');

	const firstClass = await prisma.userClass.findFirst({ where: { userId: user.id } });
	if (!firstClass) throw new Error('User has not joined any classes');

	const userActivities = prisma.userActivities.findMany({
		where: {
			userId: user.id,
			classId: firstClass.classId
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
			classId: firstClass.classId
		},
		include: {
			actionType: true
		}
	});

	return {
		user: { ...event.locals.user, exp },
		actions
	};
}
