import { Prisma } from '@prisma/client';

export const userActivityQuery = {
	include: {
		actionType: {
			include: {
				group: true
			}
		},
		user: {
			select: {
				id: true,
				username: true
			}
		},
		class: {
			select: {
				id: true,
				name: true,
				description: true
			}
		},
		attributeMap: {
			select: {
				value: true
			}
		}
	}
};

export const userActivityValidatorPayload =
	Prisma.validator<Prisma.UserActivitiesDefaultArgs>()(userActivityQuery);

export type TableUserActivity = Prisma.UserActivitiesGetPayload<
	typeof userActivityValidatorPayload
>;

export interface RowTableUserActivity {
	id: number;
	username: string;
	actionTypeName: string;
	doneAt: string;
	valid: boolean;
	proof: unknown;
}
