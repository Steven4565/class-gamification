import prisma from '$lib/server/prisma.js';
import type { ActivityProp } from '$lib/types/activity';
import { json } from '@sveltejs/kit';

async function getActions(userId: string, classId: number) {
	const userActions = await prisma.userActivities.findMany({
		where: { userId, classId },
		include: {
			actionType: true
		}
	});

	return userActions;
}

async function getQuotaMap(userId: string, classId: number) {
	const userActions = await getActions(userId, classId);

	const activities = await prisma.activityType.findMany();
	const activitiesMap: Record<number, number> = userActions.reduce(
		(quotaMap: Record<number, number>, { actionTypeId }) => {
			if (!quotaMap[actionTypeId]) quotaMap[actionTypeId] = 1;
			quotaMap[actionTypeId]++;
			return quotaMap;
		},
		{}
	);

	const actionWithQuota: ActivityProp[] = activities.map((action) => {
		return {
			...action,
			quota: activitiesMap[action.id] || 0
		};
	});

	return actionWithQuota;
}

export const GET = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const classId = url.searchParams.get('classId');

	if (!userId || !classId || Number.isNaN(parseInt(classId))) {
		throw new Error('Invalid parameters');
	}

	const actionWithQuota = await getQuotaMap(userId, parseInt(classId));

	return json({ activities: actionWithQuota });
};
