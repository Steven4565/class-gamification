import { Prisma } from '@prisma/client';

export const activityQuery = {
	include: {
		actionType: true,
		class: true
	}
};

const activityValidator = Prisma.validator<Prisma.UserActivitiesDefaultArgs>()(activityQuery);

export type ActivityPointsType = Prisma.UserActivitiesGetPayload<typeof activityValidator>;
