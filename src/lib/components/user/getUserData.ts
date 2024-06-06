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
	levels = levels.sort((l) => l.level).reverse();

	let currExp = exp;
	let currentLevel = 0;
	levels.forEach((level, i) => {
		if (currExp >= level.experience) {
			currExp -= level.experience;
			currentLevel = i;
		}
	});

	let nextExp;
	if (currentLevel === levels.length - 1) {
		nextExp = levels[currentLevel].experience;
		currExp += nextExp;
	} else {
		nextExp = levels[currentLevel + 1].experience;
	}

	return {
		title: levels[currentLevel].levelName,
		nextExp,
		currExp
	};
}
