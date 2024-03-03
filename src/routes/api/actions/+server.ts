import { error, json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

async function getActions(userId: string, classId: number) {
	const userActions = await prisma.userActivities.findMany({
		where: { userId, classId },
		include: {
			actionType: true
		}
	});

	return userActions;
}

export const GET = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const classId = Number(url.searchParams.get('classId'));

	if (!userId || !classId || Number.isNaN(classId)) {
		return error(400, 'Invalid request');
	}

	const actions = await getActions(userId, classId);

	return json(actions);
};
