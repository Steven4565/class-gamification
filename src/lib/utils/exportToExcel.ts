import type { Prisma } from '@prisma/client';
import moment from 'moment-timezone';
import * as XLSX from 'xlsx';

type ActivitiesType = Prisma.UserActivitiesGetPayload<{
	include: {
		actionType: true;
		user: {
			select: {
				id: true;
				username: true;
			};
		};
		class: {
			select: {
				id: true;
				name: true;
				description: true;
			};
		};
	};
}>[];

type ExcelType = {
	NIM: string;
	Name: string;
	ActivityName: string;
	ActivityDescription: string;
	Date: string;
};

export function studentActivityDownloadExcel(data: ActivitiesType) {
	const excelData: ExcelType[] = data.map((activity) => {
		return {
			NIM: activity.user.id,
			Name: activity.user.username,
			ActivityName: activity.actionType.name,
			ActivityDescription: activity.actionType.description,
			Date: moment(activity.doneAt).tz('Asia/Jakarta').format('D MMM YYYY : HH:mm:ss'),
			Valid: activity.valid
		};
	});

	const worksheet = XLSX.utils.json_to_sheet(excelData);

	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Activities');

	const filename = `${data[0].class.name} (${data[0].class.description}) Student Activities.xlsx`;

	XLSX.writeFile(workbook, filename);
}
