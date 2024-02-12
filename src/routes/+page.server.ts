import prisma from '$lib/server/prisma';
import { fail, type Actions } from '@sveltejs/kit';

interface activityQuota {
	[activityId: number]: number;
}

export async function load(event) {
	const user = await prisma.user.findFirst({ where: { id: event.locals.user?.id } });
	if (!user) throw fail(400, { message: 'User not found' });

	const activities = await prisma.activityType.findMany();
	const userActivities = await prisma.userActivities.findMany({ where: { userId: user.id } });
	const activitiesMap: activityQuota = userActivities.reduce(
		(quotaMap: Record<number, number>, { actionTypeId }) => {
			if (!quotaMap[actionTypeId]) quotaMap[actionTypeId] = 1;
			quotaMap[actionTypeId]++;
			return quotaMap;
		},
		{}
	);

	const activityWithQuota = activities.map((activity) => {
		return {
			...activity,
			quota: activitiesMap[activity.id] || 0
		};
	});

	return {
		props: {
			activities: activityWithQuota
		}
	};
}

export const actions: Actions = {
	default: async (event) => {},
	completeAction: async (event) => {}
};
