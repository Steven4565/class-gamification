import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
const prisma = new PrismaClient();

interface ActivityType {
	name: string;
	experience: number;
}

interface QuestType {
	name: string;
	experience: number;
}

const activity: ActivityType[] = [
	{
		name: 'attendance',
		experience: 10
	},
	{
		name: 'answerQuestion',
		experience: 2
	},
	{
		name: 'replyForum',
		experience: 2
	},
	{
		name: 'submitWeeklyAsg',
		experience: 10
	}
];

async function main() {
	const titles = ['Protector of the Realm', 'The Excellent', 'The Explorer', 'The Conquerer'];
	titles.forEach(async (title) => {
		await prisma.title.upsert({
			where: { titleName: title },
			update: {},
			create: { titleName: title }
		});
	});

	activity.forEach(async (action) => {
		await prisma.activityType.upsert({
			where: { name: action.name },
			update: {},
			create: action
		});
	});

	await prisma.user.upsert({
		where: { id: 'admin' },
		update: {},
		create: {
			id: 'admin',
			username: 'admin',
			password: await new Argon2id().hash('admin')
		}
	});

	const users = ['user', 'user2', 'user3', 'user4', 'user5'];
	users.forEach(async (user) => {
		await prisma.user.upsert({
			where: { id: user },
			update: {},
			create: {
				id: user,
				username: user,
				password: await new Argon2id().hash(user)
			}
		});
	});
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
