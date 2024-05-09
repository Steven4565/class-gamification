import type { ActivityGroup, ActivityType } from '@prisma/client';

export interface ActivityProp extends ActivityType {
	quota: number;
	group: ActivityGroup;
}
