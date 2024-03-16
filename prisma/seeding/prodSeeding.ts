import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { Prisma } from '@prisma/client';

import userList from './userList';

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
		name: 'answer3Questions',
		experience: 10,
		description: 'Answering 3 Questions in Class',
		maxQuota: 1,
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
		name: 'finishGivenCourse',
		experience: 50,
		description: 'Finish the given course related to machine learning',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'finishAdditionalCourse',
		experience: 100,
		description: 'Finish 1 additional course related to machine learning',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'postThreeTimes',
		experience: 50,
		description: 'Post or reply 3 Times in discussion forum',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'submitAllWeeklyAssignments',
		experience: 10,
		description: 'Submit all weekly assignments',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'midExam',
		experience: 10,
		description: 'Attetnd the mid exam',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'finalExam',
		experience: 10,
		description: 'Attend the final exam',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'submitProject',
		experience: 50,
		description: 'Submit the project assignment',
		maxQuota: 1,
		resetTime: 'semester'
	},
	{
		name: 'completeAllQuests',
		experience: 500,
		description: 'Complete all the quests',
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
		where: { id: 'admin1' },
		update: {},
		create: {
			id: 'admin1',
			username: 'adminSteven',
			password: await new Argon2id().hash('steven is an admin'),
			role: 'admin'
		}
	});

	await prisma.user.upsert({
		where: { id: 'admin2' },
		update: {},
		create: {
			id: 'admin2',
			username: 'adminAndry',
			password: await new Argon2id().hash('I love sir andry'),
			role: 'admin'
		}
	});

	const data = userList.map((user) => {
		return {
			id: user.nim.toString(),
			username: user.name,
			password: user.nim.toString(),
			role: 'user'
		};
	});

	await prisma.user.createMany({ data });
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

async function main() {
	await insertTitles();
	await insertActvities();
	await insertClass();
	await insertUsers();
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
