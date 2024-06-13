import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

enum groups {
	// This cannot start from 0 because Prisma will automatically insert it as 1 for some reason
	WEEKLY = 1,
	SEMESTER,
	IMAGE_SEMESTER
}

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
				description: 'This is a class description'
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

async function insertActivities() {
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
			maxQuota: 100,
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

	await prisma.activityType.createMany({
		data: activity
	});
}

async function insertUsers() {
	await prisma.user.upsert({
		where: { id: 'admin' },
		update: {},
		create: {
			id: 'admin',
			username: 'admin',
			password: await new Argon2id().hash('admin'),
			role: 'admin'
		}
	});

	const users = ['user', 'user2', 'user3', 'user4', 'user5'];

	for (const user of users) {
		await prisma.user.upsert({
			where: { id: user },
			update: {},
			create: {
				id: user,
				username: user,
				password: await new Argon2id().hash(user),
				role: 'user'
			}
		});
	}
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
	await insertActivities();

	await insertTitles();
	await insertLevels();

	await insertClass();
	await insertUsers();

	await prisma.userClass.createMany({
		data: [
			{ userId: 'user', classId: 1 },
			{ userId: 'user', classId: 2 },
			{ userId: 'user2', classId: 1 },
			{ userId: 'user2', classId: 2 },
			{ userId: 'user3', classId: 2 },
			{ userId: 'user4', classId: 2 }
		]
	});

	await prisma.userActivities.createMany({
		data: [
			{ userId: 'user', classId: 1, actionTypeId: 1, doneAt: new Date('2024-03-21') },
			{ userId: 'user', classId: 1, actionTypeId: 1, doneAt: new Date('2024-03-03') }
		]
	});
}

export default function devSeed() {
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
