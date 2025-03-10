import { HomeworkType } from "../constants/homework";
import { prisma } from "../database/prisma";
import { isValidDate } from "../util/IsValidDate";
import { yearDecider } from "../util/YearDecider";

interface CreateHomeworkBase {
	fileId: number;
	date?: number;
	month?: number;
	year?: number;
	type: HomeworkType;
	label: string;
}
interface CreateHomeworkPayload {
    file_id: number;
    timestamp: Date;
    day_name: string;
    no_deadline: boolean;
    date: number;
    month: number;
    year: number;
    type: HomeworkType;
    label: string;
}

const MAX_TIMESTAMP = new Date(9999999999999);
const DELTA_TIME_SECOND = 0;

export default class HomeworkRepository {
	private static generate(base: CreateHomeworkBase): CreateHomeworkPayload | Error {
		if (!base.date || !base.month || !base.year) {
			return {
				file_id: base.fileId,
				date: 0,
				month: 0,
				year: 0,
				timestamp: MAX_TIMESTAMP,
				day_name: "Sunday",
				no_deadline: true,
				...base,
			};
		}

		let decidedYear: number;
		let timestamp: number;
		try {
			decidedYear = yearDecider(base.date, base.month);

			if (!isValidDate(base.date, base.month, decidedYear)) {
				return new Error("Invalid date");
			}

			timestamp = new Date(
				decidedYear,
				base.month - 1,
				base.date,
				23,
				59,
				59
			).getTime();
		} catch (e) {
			return Error(String(e));
		}

		const finalTimestamp = timestamp + DELTA_TIME_SECOND;
		return {
			file_id: base.fileId,
			timestamp: new Date(finalTimestamp),
			day_name: new Date(finalTimestamp).toLocaleDateString("en-US", {
				weekday: "long",
			}),
			no_deadline: false,
			date: base.date,
			month: base.month,
			year: decidedYear,
			type: base.type,
			label: base.label,
		};
	}

	static async create(payload: CreateHomeworkBase, fileId: number) {
		const data = this.generate({ ...payload, fileId });
		if (data instanceof Error) {
			return data;
		}
		return prisma.homework.create({ data });
	}

	static async bulkCreate(payload: CreateHomeworkBase[]) {
		const dataList = payload.map((data) => this.generate({ ...data }));
        const error = dataList.find((data) => data instanceof Error);
        if (dataList instanceof Error) {
            return error;
        }
        return prisma.homework.createMany({ data: dataList as CreateHomeworkPayload[] });
	}
}
