import prisma from '$lib/server/prisma';
import type { ActivityProp } from '$lib/types/activity.js';
import { fail, type Actions } from '@sveltejs/kit';

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

export async function load(event) {
	const user = await prisma.user.findFirst({
		where: { id: event.locals.user?.id },
		include: { userClass: true }
	});
	if (!user) throw fail(400, { message: 'User not found' });
	if (!user.userClass.length) throw fail(400, { message: 'User not found' });

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
}

export const actions: Actions = {
	submitAction: async (event) => {
		const formData = await event.request.formData();
		const actionId = Number(formData.get('actionId'));
		const classId = Number(formData.get('classId'));
		if (typeof actionId !== 'number') return fail(400, { message: 'Invalid actionId' });
		if (typeof classId !== 'number') return fail(400, { message: 'Invalid classId' });

		const user = await prisma.user.findFirst({
			where: { id: event.locals.user?.id },
			include: { userClass: true }
		});

		const action = await prisma.activityType.findFirst({ where: { id: actionId } });
		if (!action) return fail(400, { message: 'Action not found' });
		if (!user) return fail(400, { message: 'User not found' });

		await prisma.$transaction(async (prisma) => {
			const quota = await prisma.userActivities.count({
				where: {
					userId: user.id,
					actionTypeId: action.id,
					classId: classId
				}
			});

			if (quota > action.maxQuota) {
				return fail(400, { message: 'Quota exceeded' });
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

		return { success: true };
	}
};
