import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { HomeworkServiceType } from "../types/services/HomeworkServiceType";
import { HomeworkType } from "../constants/homework";
import { prisma } from "../database/prisma";
import { Homework, HomeworkChannel, HomeworkFile } from "@prisma/client";
import { yearDecider } from "../util/YearDecider";
import { searchHomework } from "../util/SearchHomework";
import { isValidDate } from "../util/IsValidDate";

const MAX_TIMESTAMP = new Date(9999999999999);
const DELTA_TIME_SECOND = 0;

async function homeworkManageAuth(
	discord_id: string,
	channel: HomeworkChannel & { homework_file: HomeworkFile }
) {
	if (!channel) {
		return { status: 404 };
	}

	const file = channel.homework_file;

	if (!channel.can_edit && file.owner_id !== discord_id) {
		return { status: 401 };
	}

	return { status: 200 };
}

export const HomeworkService: HomeworkServiceType = {
	create: async (discord_id, channel_id, body) => {
		const channel = await prisma.homeworkChannel.findUnique({
			where: { channel_id },
			include: { homework_file: true },
		});

		if (!channel) {
			return { status: 404 };
		}

		const authResponse = await homeworkManageAuth(discord_id, channel);
		if (authResponse.status >= 400) {
			return authResponse;
		}

		if (!body.date || !body.month || !body.year) {
			return prisma.homework.create({
				data: {
					file_id: channel.file_id,
					date: 0,
					month: 0,
					year: 0,
					timestamp: MAX_TIMESTAMP,
					day_name: "Sunday",
					no_deadline: true,
					...body,
				},
			});
		}

		let decidedYear: number;
		let timestamp: number;
		try {
			decidedYear = yearDecider(body.date, body.month);

            if (!isValidDate(body.date, body.month, decidedYear)) {
                return { status: 400 };
            }

			timestamp = new Date(
				decidedYear,
				body.month - 1,
				body.date,
				23,
				59,
				59
			).getTime();
		} catch (e) {
			return { status: 400 };
		}

		const finalTimestamp = timestamp + DELTA_TIME_SECOND;
		return prisma.homework.create({
			data: {
				file_id: channel.file_id,
				timestamp: new Date(finalTimestamp),
				day_name: new Date(finalTimestamp).toLocaleDateString("en-US", {
					weekday: "long",
				}),
				no_deadline: false,
				date: body.date,
				month: body.month,
				year: decidedYear,
				type: body.type,
				label: body.label,
			},
		});
	},
	getAll: async (channel_id, type, keyword) => {
		if (!type) type = HomeworkType.ALL;
		if (!keyword) keyword = "";

		const channel = await prisma.homeworkChannel.findUnique({
			where: {
				channel_id,
			},
			include: { homework_file: true },
		});

		if (!channel) {
			return { status: 400 };
		}

		const totalHomeworksCount = await prisma.homework.count({
			where: {
				file_id: channel.file_id,
			},
		});
		let filteredHomeworkCount = totalHomeworksCount;

		let homeworks: Homework[] = [];

		if (type === HomeworkType.ALL) {
			homeworks = await prisma.homework.findMany({
				where: {
					file_id: channel.file_id,
					timestamp: {
						gte: new Date(),
					},
				},
                orderBy: {
                    timestamp: 'asc',
                }
			});
		} else {
			homeworks = await prisma.homework.findMany({
				where: {
					file_id: channel.file_id,
                    timestamp: {
                        gte: new Date(),
                    },
					type: type,
				},
                orderBy: {
                    timestamp: 'asc',
                }
			});
			filteredHomeworkCount = homeworks.length;
		}

		const filteredHomeworks = await searchHomework(homeworks, keyword);
		filteredHomeworkCount = filteredHomeworks.length;

		return {
			file: channel.homework_file,
			total_homework_count: totalHomeworksCount,
			type_homework_count: filteredHomeworkCount,
			homeworks: filteredHomeworks,
		};
	},
	update: async (discord_id, channel_id, homework_id, body) => {
		const channel = await prisma.homeworkChannel.findUnique({
			where: { channel_id },
			include: { homework_file: true },
		});

		if (!channel) {
			return { status: 404 };
		}

		const authResponse = await homeworkManageAuth(discord_id, channel);
		if (authResponse.status >= 400) {
			return authResponse.status;
		}

		const homework = await prisma.homework.findUnique({
			where: { homework_id },
		});

		if (!homework) {
			return { status: 404 };
		}

		const newHomeworkData = {
			...homework,
		};

		if (body.no_deadline) {
			newHomeworkData.no_deadline = true;
			newHomeworkData.timestamp = MAX_TIMESTAMP;
		} else if (!homework.no_deadline || body.date || body.month) {
			newHomeworkData.date = body.date || newHomeworkData.date;
			newHomeworkData.month = body.month || newHomeworkData.month;
			newHomeworkData.year = yearDecider(
				newHomeworkData.date,
				newHomeworkData.month
			);
			newHomeworkData.no_deadline = false;

			const newTimestamp = new Date(
				newHomeworkData.year,
				newHomeworkData.month - 1,
				newHomeworkData.date,
				23,
				59,
				59
			).getTime();

			newHomeworkData.timestamp = new Date(
				newTimestamp + DELTA_TIME_SECOND
			);
			newHomeworkData.day_name = new Date(
				newHomeworkData.timestamp
			).toLocaleDateString("en-US", { weekday: "long" });
		}

		newHomeworkData.is_checked = false;
		newHomeworkData.type = body.type || newHomeworkData.type;
		newHomeworkData.label = body.label || newHomeworkData.label;

		return prisma.homework.update({
			where: { homework_id },
			data: newHomeworkData,
		});
	},
	delete: async (discord_id, channel_id, homework_id) => {
		const channel = await prisma.homeworkChannel.findUnique({
			where: { channel_id },
			include: { homework_file: true },
		});

		if (!channel) {
			return { status: 404 };
		}

		const authResponse = await homeworkManageAuth(discord_id, channel);
		if (authResponse.status >= 400) {
			return authResponse.status;
		}

		await prisma.homework.delete({
			where: { homework_id },
		});

		return { status: 204 };
	},
	check: async (discord_id, channel_id, homework_id, body) => {
		const channel = await prisma.homeworkChannel.findUnique({
			where: { channel_id },
			include: { homework_file: true },
		});

		if (!channel) {
			return { status: 404 };
		}

		const authResponse = await homeworkManageAuth(discord_id, channel);
		if (authResponse.status >= 400) {
			return authResponse.status;
		}

		return prisma.homework.update({
			where: { homework_id },
			data: {
				is_checked: body.is_checked,
			},
		});
	},
};
