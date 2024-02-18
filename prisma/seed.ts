import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const activity: Prisma.ActivityTypeCreateInput[] = [
	{
		name: 'attendance',
		experience: 10,
		description: 'Attendance in class',
		maxQuota: 1,
		resetTime: 'weekly'
	},
	{
		name: 'answerQuestion',
		experience: 2,
		description: 'Answering Questions in Class',
		maxQuota: 3,
		resetTime: 'weekly'
	},
	{
		name: 'replyForum',
		experience: 2,
		description: 'Replying in the forum',
		maxQuota: 3,
		resetTime: 'weekly'
	},
	{
		name: 'submitWeeklyAsg',
		experience: 10,
		description: 'Submitting weekly assignments',
		maxQuota: 1,
		resetTime: 'weekly'
	},
	{
		name: 'submitProject',
		experience: 50,
		description: 'Submitting a project',
		maxQuota: 1,
		resetTime: 'semester'
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

async function insertActvities() {
	activity.forEach(async (action) => {
		await prisma.activityType.upsert({
			where: { name: action.name },
			update: {},
			create: action
		});
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

async function main() {
	await insertTitles();
	await insertActvities();
	await insertClass();
	await insertUsers();

	await prisma.userClass.createMany({
		data: [
			{ userId: 'user', classId: 1 },
			{ userId: 'user', classId: 2 },
			{ userId: 'user2', classId: 1 },
			{ userId: 'user2', classId: 2 }
		]
	});

	await prisma.userActivities.createMany({
		data: [
			{ userId: 'user', classId: 1, actionTypeId: 1 },
			{ userId: 'user2', classId: 1, actionTypeId: 3 },
			{ userId: 'user2', classId: 1, actionTypeId: 2 },
			{ userId: 'user', classId: 1, actionTypeId: 4 },
			{ userId: 'user2', classId: 1, actionTypeId: 1 },
		]
	})
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
