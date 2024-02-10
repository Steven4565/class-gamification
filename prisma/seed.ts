import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface ActionType {
	name: string;
	experience: number;
}
const actions: ActionType[] = [
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
	actions.forEach(async (action) => {
		await prisma.actionType.upsert({
			where: { name: action.name },
			update: {},
			create: action
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
