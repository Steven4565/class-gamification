import { lucia } from '$lib/server/auth';
import { errorHandler } from '$lib/server/errorHandler';
import prisma from '$lib/server/prisma';
import type { ActivityProp } from '$lib/types/activity.js';
import { fail, type Actions, error, redirect } from '@sveltejs/kit';

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

async function getActivities(userId: string, classId: number) {
	const userActivities = await prisma.userActivities.findMany({
		where: { userId, classId }
	});

	return userActivities;
}

function getActivityResetDate(resetTime: string) {
	if (resetTime === 'weekly') {
		return getStartOfWeek();
	} else return getStartOfSemester();
}

async function getQuotaMap(userId: string, classId: number) {
	const userActivities = await getActivities(userId, classId);

	const activities = await prisma.activityType.findMany();
	if (!activities) error(400, { message: 'No activities found' });

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

export async function load(event) {
	const user = await prisma.user.findFirst({
		where: { id: event.locals.user?.id },
		include: { userClass: true }
	});
	if (!user) error(400, { message: 'User not found' });
	if (!user.userClass.length) error(400, { message: 'User class not found' });

	try {
		const activityWithQuota = await getQuotaMap(user.id, user.userClass[0].classId);
		const classes = await prisma.userClass.findMany({
			where: {
				userId: user.id
			},
			include: {
				class: true
			}
		});

		return {
			props: {
				actions: activityWithQuota
			},
			classes,
			userId: user.id
		};
	} catch (e) {
		console.error(e);
		error(500, { message: 'Internal server error' });
	}
}

export const actions: Actions = {
	submitAction: async (event) => {
		const formData = await event.request.formData();
		const actionId = Number(formData.get('actionId'));
		const classId = Number(formData.get('classId'));
		if (Number.isNaN(actionId)) return fail(400, { message: 'Invalid actionId' });
		if (Number.isNaN(classId)) return fail(400, { message: 'Invalid classId' });

		const user = await prisma.user.findFirst({
			where: { id: event.locals.user?.id },
			include: { userClass: true }
		});

		const action = await prisma.activityType.findFirst({ where: { id: actionId } });
		if (!action) return fail(400, { message: 'Action not found' });
		if (!user) return fail(400, { message: 'User not found' });

		try {
			await prisma.$transaction(async (prisma) => {
				const quota = await prisma.userActivities.count({
					where: {
						userId: user.id,
						actionTypeId: action.id,
						classId: classId,
						doneAt: {
							gte: action.resetTime === 'weekly' ? getStartOfWeek() : getStartOfSemester()
						}
					}
				});

				if (quota >= action.maxQuota) {
					throw new Error('Quota exceeded');
				}

				await prisma.userActivities.create({
					data: {
						actionTypeId: action.id,
						userId: user.id,
						doneAt: new Date(),
						classId: classId
					}
				});
			});
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Internal server error' });
		}
	},
	logout: async (event) => {
		if (!event.locals.session) return redirect(302, '/login');
		const [resError] = await errorHandler(lucia.invalidateSession(event.locals.session.id));
		if (resError) return fail(500, { message: 'Internal server error' });

		event.cookies.delete(lucia.sessionCookieName, { path: '.' });
		return redirect(302, '/login');
	}
};
