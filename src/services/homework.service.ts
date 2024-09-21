import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { HomeworkServiceType } from "../types/services/HomeworkServiceType";
import { HomeworkType } from "../constants/homework";
import { prisma } from "../database/prisma";
import { HomeworkChannel, HomeworkFile } from "@prisma/client";

const MaxTimestamp = 9999999999;

async function homeworkManageAuth(discord_id: string, channel: HomeworkChannel & { homework_file: HomeworkFile }) {

    if (!channel) {
        throw new Error("Channel not found");
    }

    const file = channel.homework_file;

    if (!channel.can_edit && file.owner_id !== discord_id) {
        throw new Error("You are not the owner of this file");
    }

}

export const HomeworkService: HomeworkServiceType = {
	create: async (discord_id, channel_id, body) => {

        const channel = await prisma.homeworkChannel.findUnique({
            where: { channel_id },
            include: { homework_file: true }
        })

        if (!channel) {
            throw new Error("Channel not found");
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
                    day_name: "Snuday",
                    no_deadline: true,
                    ...body,
                }
            })
        }
        
        const dateTS = new Date(body.year, body.month - 1, body.date);

	},
	getAll: async (channel_id, type, keyword) => {
		if (!type) type = HomeworkType.ALL;
		if (!keyword) keyword = "";
		return axios
			.get(
				`${BACKEND_URL}/channel/${channel_id}` +
					`?type=${type.toUpperCase()}` +
					`&keyword=${keyword}`
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
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
