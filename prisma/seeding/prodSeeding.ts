import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { Prisma } from '@prisma/client';

import userList from './userList';

const prisma = new PrismaClient();

enum groups {
	// This cannot start from 0 because Prisma will automatically insert it as 1 for some reason
	WEEKLY = 1,
	SEMESTER,
	IMAGE_SEMESTER
}

const activity: Prisma.ActivityTypeCreateManyInput[] = [
	{
		name: 'attendance',
		experience: 10,
		description: 'Attendance in class',
		maxQuota: 1,
		resetTime: 'weekly',
		activityGroupId: groups.WEEKLY
	},
	{
		name: 'answerQuestion',
		experience: 2,
		description: 'Answering Questions in Class',
		maxQuota: 3,
		resetTime: 'weekly',
		activityGroupId: groups.WEEKLY
	},
	{
		name: 'replyForum',
		experience: 2,
		description: 'Replying in the forum',
		maxQuota: 3,
		resetTime: 'weekly',
		activityGroupId: groups.WEEKLY
	},
	{
		name: 'submitCert',
		experience: 10,
		description: 'Submitting an ML certificate',
		maxQuota: 10,
		resetTime: 'semester',
		activityGroupId: groups.IMAGE_SEMESTER
	},
	{
		name: 'submitProject',
		experience: 50,
		description: 'Submitting a project',
		maxQuota: 1,
		resetTime: 'semester',
		activityGroupId: groups.SEMESTER
	}
];

async function insertClass() {
	const classes = ['LA02', 'LB02', 'LC02'];
	for (const [i, className] of classes.entries()) {
		await prisma.class.upsert({
			where: {
				id: i + 1,
				name: className
			},
			update: {},
			create: {
				name: className,
				description: `${className} B26 global class semester 4`
			}
		});
	}
}

async function insertTitles() {
	const titles = ['Protector of the Realm', 'The Excellent', 'The Explorer', 'The Conquerer'];
	for (const title of titles) {
		await prisma.title.upsert({
			where: { titleName: title },
			update: {},
			create: { titleName: title }
		});
	}
}

async function insertActvities() {
	await prisma.activityType.createMany({
		data: activity
	});
}

async function insertUsers() {
	const argon = new Argon2id();
	await prisma.user.upsert({
		where: { id: 'admin1' },
		update: {},
		create: {
			id: 'admin1',
			username: 'adminSteven',
			password: await argon.hash('steven is an admin'),
			role: 'admin'
		}
	});

	await prisma.user.upsert({
		where: { id: 'admin2' },
		update: {},
		create: {
			id: 'admin2',
			username: 'adminAndry',
			password: await argon.hash('I love sir andry'),
			role: 'admin'
		}
	});

	const dataAsync = userList.map(async (user) => {
		return {
			id: user.nim.toString(),
			username: user.name,
			password: await argon.hash(user.nim.toString()),
			role: 'user'
		};
	});
	const data = await Promise.all(dataAsync);

	await prisma.user.createMany({ data });
}

async function insertLevels() {
	interface Level {
		level: number;
		experience: number;
		levelName: string;
	}
	const levels: Level[] = [
		{
			level: 1,
			experience: 0,
			levelName: 'Beginner'
		},
		{
			level: 2,
			experience: 100,
			levelName: 'Intermediate'
		},
		{
			level: 3,
			experience: 200,
			levelName: 'Advanced'
		}
	];

	await prisma.level.createMany({
		data: levels
	});
}

async function insertUserClassMapping() {
	const data = userList.map((user) => {
		return {
			userId: user.nim.toString(),
			classId: 2
		};
	});
	await prisma.userClass.createMany({
		data
	});
}

interface UserActivity {
	userId: string;
	classId: number;
	actionTypeId: number;
	doneAt: Date;
}

async function insertUserActivities() {
	const firstWeekDate = new Date('2024-01-02');
	const secondWeekDate = new Date('2024-01-02');

	const data: UserActivity[] = [];

	userList.forEach((user) => {
		if (user.FIELD3) {
			if (user.FIELD3 <= 6) {
				for (let i = 0; i < user.FIELD3 / 2; i++) {
					data.push({
						userId: user.nim.toString(),
						classId: 2,
						actionTypeId: 1,
						doneAt: firstWeekDate
					});
				}
			} else {
				data.push({
					userId: user.nim.toString(),
					classId: 2,
					actionTypeId: 2,
					doneAt: secondWeekDate
				});
			}
		}
		if (user.FIELD4) {
			if (user.FIELD4 <= 6) {
				for (let i = 0; i < user.FIELD4 / 2; i++) {
					data.push({
						userId: user.nim.toString(),
						classId: 2,
						actionTypeId: 1,
						doneAt: firstWeekDate
					});
				}
			} else {
				data.push({
					userId: user.nim.toString(),
					classId: 2,
					actionTypeId: 2,
					doneAt: secondWeekDate
				});
			}
		}
	});
	await prisma.userActivities.createMany({ data });
}

async function insertGroups() {
	interface Group {
		id: number;
		name: string;
	}

	const input: Group[] = [
		{
			id: groups.WEEKLY,
			name: 'weekly'
		},
		{
			id: groups.SEMESTER,
			name: 'semester'
		},
		{
			id: groups.IMAGE_SEMESTER,
			name: 'imageSemester'
		}
	];

	await prisma.activityGroup.createMany({
		data: input
	});
}

async function insertAttributes() {
	interface Attribute {
		name: string;
	}

	const input: Attribute[] = [
		{
			name: 'url'
		}
	];

	await prisma.attribute.createMany({
		data: input
	});
}

async function main() {
	await insertGroups();
	await insertAttributes();
	await insertActvities();

	await insertTitles();
	await insertLevels();

	await insertUsers();
	await insertClass();

	await insertUserClassMapping();
	await insertUserActivities();
}

export default function prodSeed() {
	main()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
}
