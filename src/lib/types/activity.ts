import type { ActivityType } from '@prisma/client';

export interface ActivityProp extends ActivityType {
	quota: number;
}
