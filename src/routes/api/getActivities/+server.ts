import prisma from '$lib/server/prisma.js';
import type { ActivityProp } from '$lib/types/activity';
import { error, json } from '@sveltejs/kit';

async function getActivities(userId: string, classId: number) {
	const userActivities = await prisma.userActivities.findMany({
		where: { userId, classId }
	});

	return userActivities;
}

async function getQuotaMap(userId: string, classId: number) {
	const userActivities = await getActivities(userId, classId);

	const activities = await prisma.activityType.findMany();
	const activitiesMap: Record<number, number> = userActivities.reduce(
		(quotaMap: Record<number, number>, { actionTypeId }) => {
			if (!quotaMap[actionTypeId]) quotaMap[actionTypeId] = 1;
			quotaMap[actionTypeId]++;
			return quotaMap;
		},
		{}
	);

	const activityWithQuota: ActivityProp[] = activities.map((activity) => {
		return {
			...activity,
			quota: activitiesMap[activity.id] || 0
		};
	});

	return activityWithQuota;
}

export const GET = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const classId = url.searchParams.get('classId');

	if (!userId || !classId || Number.isNaN(parseInt(classId))) {
		return error(400, 'Invalid request');
	}

	const activityWithQuota = await getQuotaMap(userId, parseInt(classId));

	return json({ activities: activityWithQuota });
};
