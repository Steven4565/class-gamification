import prisma from '$lib/server/prisma';
import type { ActivityProp } from '$lib/types/activity.js';
import { fail, type Actions } from '@sveltejs/kit';

export async function load(event) {
	const user = await prisma.user.findFirst({ where: { id: event.locals.user?.id } });
	if (!user) throw fail(400, { message: 'User not found' });

	const activities = await prisma.activityType.findMany();
	// TODO: add class in where clause, handle error when no class is found
	const userActivities = await prisma.userActivities.findMany({ where: { userId: user.id } });
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
			activities: activityWithQuota
		},
		classes
	};
}

export const actions: Actions = {
	submitAction: async (event) => {
		const formData = await event.request.formData();
		const actionId = Number(formData.get('actionId'));
		if (typeof actionId !== 'number') {
			return fail(400, { message: 'Invalid actionId' });
		}

		const action = await prisma.activityType.findFirst({ where: { id: actionId } });
		if (!action) {
			return fail(400, { message: 'Action not found' });
		}

		if (!event.locals.user) {
			return fail(400, { message: 'User not found' });
		}
		// TODO: check if user hasn't exceeded quota

		await prisma.userActivities.create({
			data: {
				actionTypeId: action.id,
				userId: event.locals.user.id,
				doneAt: new Date()
			}
		});

		console.log('success');
		return { success: true };
	}
};
