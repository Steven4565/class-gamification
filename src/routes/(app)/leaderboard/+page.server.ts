import { errorHandler } from '$lib/server/errorHandler';
import prisma from '$lib/server/prisma.js';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

type ActivityPointsType = ({
	actionType: {
		id: number;
		name: string;
		description: string;
		experience: number;
		maxQuota: number;
		resetTime: string;
		activityGroupId: number;
		titleId: number | null;
	};
} & {
	id: number;
	userId: string;
	actionTypeId: number;
	classId: number;
	doneAt: Date;
	valid: boolean;
})[];

function getSortedList(userActivitiesWithPoints: ActivityPointsType) {
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

async function getLocal(classId: number) {
	const [userActivitiesWithPoints, pointsError] = await errorHandler(
		prisma.userActivities.findMany({
			where: {
				classId
			},
			include: {
				actionType: true
			}
		})
	);
	if (!userActivitiesWithPoints || pointsError) throw pointsError;
	return getSortedList(userActivitiesWithPoints);
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

	return getSortedList(userActivitiesWithPoints);
}

async function getClasses(userId: string) {
	const classes = await prisma.userClass.findMany({
		where: {
			userId
		},
		include: {
			class: true
		}
	});
	const classProp = classes.map((c) => {
		return {
			value: c.classId.toString(),
			name: c.class.name
		};
	});
	return { classes, classProp };
}

export async function load({ locals: { user }, url }) {
	if (!user) return fail(500, { message: 'Failed to fetch user' });

	// load classes
	const [classRes, classError] = await errorHandler(getClasses(user.id));
	if (classError || !classRes) error(400, { message: 'No classes joined' });
	const { classes } = classRes;

	// redirect user to first class
	const classIdParams = url.searchParams.get('classId');
	const classUrl = `/leaderboard?classId=${classes[0].classId}`;
	if (classIdParams === null || !classes.find((c) => c.classId === parseInt(classIdParams)))
		redirect(302, classUrl);

	// check valid class ID
	const classId = parseInt(classIdParams);
	if (Number.isNaN(classId)) error(400, { message: 'Invalid classId' });

	// get local class leaderboar
	const [leaderboard, leaderboardError] = await errorHandler(getLocal(classId));
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
	local: async ({ request }) => {
		const formData = await request.formData();
		const classId = formData.get('classId')?.toString();

		if (!classId || Number.isNaN(parseInt(classId))) {
			return fail(400, { message: 'Bad Request' });
		}

		const [leaderboard, leaderboardError] = await errorHandler(getLocal(parseInt(classId)));
		if (!leaderboard || leaderboardError)
			return fail(500, { message: 'Failed to get leaderboard' });
		return { leaderboard };
	}
};
