import { errorHandler } from '$lib/server/errorHandler';
import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const user = locals.user;
	if (!user) error(401, { message: 'Unauthorized' });

	const [classData, classError] = await errorHandler(
		prisma.userClass.findMany({
			where: {
				userId: user.id
			},
			include: {
				class: true
			}
		})
	);
	if (!classData || classError) {
		console.error(classError);
		error(500, { message: 'Internal server error' });
	}

	const classes = classData.map((c) => {
		return {
			classId: c.classId,
			name: c.class.name
		};
	});

	return { classes };
};
