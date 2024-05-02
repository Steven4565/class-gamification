import { errorHandler } from '$lib/server/errorHandler';
import prisma from '$lib/server/prisma.js';
import { fail, type Actions } from '@sveltejs/kit';

// TODO: do this
async function getLocal() {
	return await getGlobal();
}

async function getGlobal() {
	const [userActivitiesWithPoints, pointsError] = await errorHandler(
		prisma.userActivities.findMany({
			include: {
				actionType: true
			}
		})
	);
	if (!userActivitiesWithPoints || pointsError) throw pointsError;

	const totalPointsPerUser = userActivitiesWithPoints.reduce(
		(acc, activity) => {
			if (!acc[activity.userId]) {
				acc[activity.userId] = 0;
			}
			acc[activity.userId] += activity.actionType.experience;
			return acc;
		},
		{} as Record<string, number>
	);

	const totalPointsPerUserArray = Object.entries(totalPointsPerUser).map(
		([userId, experience]) => ({
			userId,
			experience
		})
	);

	const sorted = totalPointsPerUserArray.sort((a, b) => b.experience - a.experience);

	return sorted;
}

export async function load() {
	const [leaderboard, leaderboardError] = await errorHandler(getGlobal());
	if (!leaderboard || leaderboardError) return fail(500, { message: 'Failed to get leaderboard' });
	return { leaderboard };
}

export const actions: Actions = {
	global: async () => {
		const [leaderboard, leaderboardError] = await errorHandler(getGlobal());
		if (!leaderboard || leaderboardError)
			return fail(500, { message: 'Failed to get leaderboard' });
		return { leaderboard };
	},
	local: async () => {
		const [leaderboard, leaderboardError] = await errorHandler(getLocal());
		if (!leaderboard || leaderboardError)
			return fail(500, { message: 'Failed to get leaderboard' });
		return { leaderboard };
	}
};
