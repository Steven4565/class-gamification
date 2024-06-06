import prisma from '$lib/server/prisma';
import type { Level } from '@prisma/client';

export async function getClasses(userId: string) {
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

export function calculateCurrentLevel(levels: Level[], exp: number) {
	let currExp = exp;
	let currentLevel = 0;
	levels.forEach((level, i) => {
		if (currExp >= level.experience) {
			currExp -= level.experience;
			currentLevel = i;
		}
	});

	return {
		level: currentLevel,
		exp: currExp
	};
}
