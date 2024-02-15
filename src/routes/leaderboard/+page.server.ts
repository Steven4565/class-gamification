import prisma from '$lib/server/prisma.js';

async function getGlobal() {
	// prisma.userActivities.groupBy({
	// 	by: ['userId'],
	// 	_sum: {
	// 		points: true
	// 	}
	// })
}

export function load(event) {
	const mockData = [
		{
			name: 'testName',
			points: 1000,
			url: '/user/100'
		},
		{
			name: 'testName',
			points: 1000,
			url: '/user/100'
		},
		{
			name: 'testName',
			points: 1000,
			url: '/user/100'
		},
		{
			name: 'testName',
			points: 1000,
			url: '/user/100'
		},
		{
			name: 'testName',
			points: 1000,
			url: '/user/100'
		}
	];
	return { mockData };
}
