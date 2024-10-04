import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { HomeworkServiceType } from "../types/services/HomeworkServiceType";
import { HomeworkType } from "../constants/homework";
import { prisma } from "../database/prisma";
import { Homework, HomeworkChannel, HomeworkFile } from "@prisma/client";
import { yearDecider } from "../util/YearDecider";
import { searchHomework } from "../util/SearchHomework";

const MaxTimestamp = 9999999999;
const DELTA_TIME_SECOND = 0

async function homeworkManageAuth(discord_id: string, channel: HomeworkChannel & { homework_file: HomeworkFile }) {

    if (!channel) {
        return { status: 404 }
    }

    const file = channel.homework_file;

    if (!channel.can_edit && file.owner_id !== discord_id) {
        return { status: 401 }
    }

}

export const HomeworkService: HomeworkServiceType = {
	create: async (discord_id, channel_id, body) => {

        const channel = await prisma.homeworkChannel.findUnique({
            where: { channel_id },
            include: { homework_file: true }
        })

        if (!channel) {
            return { status: 404 }
        }

        await homeworkManageAuth(discord_id, channel);
		
        if (!body.date || !body.month || !body.year) {
            return prisma.homework.create({
                data: {
                    file_id: channel.file_id,
                    date: 0,
                    month: 0,
                    year: 0,
                    timestamp: MaxTimestamp,
                    day_name: "Sunday",
                    no_deadline: true,
                    ...body,
                }
            })
        }

        let decidedYear: number
        let timestamp: number;
        try {
            decidedYear = yearDecider(body.date, body.month);
            timestamp = new Date(
                decidedYear,
                body.month - 1,
                body.date,
                23, 59, 59
            ).getTime();
        }
        catch (e) {
            return { status: 400 }
        }

        const finalTimestamp = timestamp + DELTA_TIME_SECOND
        return prisma.homework.create({
            data: {
                file_id: channel.file_id,
                timestamp: finalTimestamp,
                day_name: new Date(finalTimestamp).toLocaleDateString("en-US", { weekday: "long" }),
                no_deadline: false,
                date: body.date,
                month: body.month,
                year: decidedYear,
                type: body.type,
                label: body.label,
            }
        })
	},
	getAll: async (channel_id, type, keyword) => {
		if (!type) type = HomeworkType.ALL;
		if (!keyword) keyword = "";
		
        const channel = await prisma.homeworkChannel.findUnique({ where: { channel_id }, include: { homework_file: true } })

        if (!channel) {
            return { status: 400 }
        }

        const totalHomeworksCount = await prisma.homework.count({
            where: {
                file_id: channel.file_id,
            }
        })
        let filteredHomeworkCount = totalHomeworksCount

        let homeworks: Homework[] = []

        if (type === HomeworkType.ALL) {
            homeworks = await prisma.homework.findMany({
                where: {
                    file_id: channel.file_id,
                }
            })
        } else {
            homeworks = await prisma.homework.findMany({
                where: {
                    file_id: channel.file_id,
                    type: type,
                }
            })
            filteredHomeworkCount = homeworks.length
        }

        const filteredHomeworks = await searchHomework(homeworks, keyword);
        filteredHomeworkCount = filteredHomeworks.length

        return {
            file: channel.homework_file,
            total_homework_count: totalHomeworksCount,
            type_homework_count: filteredHomeworkCount,
            homeworks: filteredHomeworks,
        }

	},
	update: async (discord_id, channel_id, homework_id, body) => {
		return axios
			.put(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	delete: async (discord_id, channel_id, homework_id) => {
		return axios
			.delete(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	check: async (discord_id, channel_id, homework_id, body) => {
		return axios
			.put(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}/check`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
};
