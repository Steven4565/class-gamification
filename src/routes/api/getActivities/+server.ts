import prisma from '$lib/server/prisma.js';
import type { ActivityProp } from '$lib/types/activity';
import { error, json } from '@sveltejs/kit';

async function getActivities(userId: string, classId: number) {
	const userActivities = await prisma.userActivities.findMany({
		where: { userId, classId, valid: true }
	});

	return userActivities;
}
function getStartOfWeek() {
	const date = new Date();
	const day = date.getDay();

	date.setHours(7, 0, 0, 0); // set GMT+7 for ID
	date.setDate(date.getDate() - day + 1);

	return date;
}

function getStartOfSemester() {
	const date = new Date();

	date.setHours(7, 0, 0, 0);
	date.setMonth(date.getMonth() - 7); // 7 to overshoot because I'm too lazy to calculate the exact date
	return date;
}

function getActivityResetDate(resetTime: string) {
	if (resetTime === 'weekly') {
		return getStartOfWeek();
	} else return getStartOfSemester();
}

async function getQuotaMap(userId: string, classId: number) {
	const userActivities = await getActivities(userId, classId);

	const activities = await prisma.activityType.findMany({
		include: {
			group: true
		}
	});
	// if (!activities) error(400, { message: 'No activities found' });

	const activitiesMap: Record<number, number> = userActivities.reduce(
		(quotaMap: Record<number, number>, { actionTypeId, doneAt }) => {
			const activityResetTime = activities.find((a) => a.id === actionTypeId)?.resetTime;
			if (activityResetTime === undefined) error(400, { message: 'Activity not found' });
			const lastResetDate = getActivityResetDate(activityResetTime);

			if (!quotaMap[actionTypeId] || doneAt <= lastResetDate) quotaMap[actionTypeId] = 0;
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
		throw new Error('Invalid parameters');
	}

	const actionWithQuota = await getQuotaMap(userId, parseInt(classId));

	return json({ activities: actionWithQuota });
};
