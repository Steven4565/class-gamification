import type { PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';
import { userActivityQuery } from '$lib/types/verificationTable';
import type { TableUserActivity } from '$lib/types/verificationTable';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const res: TableUserActivity[] = await prisma.userActivities.findMany({
		where: {
			classId: Number(id)
		},
		...userActivityQuery
	});

	// console.log(res[2].attributeMap);
	// res.map((r) => r.attributeMap.values());
	// console.log(JSON.stringify(res, null, 2));

	return { userActivities: res };
};
