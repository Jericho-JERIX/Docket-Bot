import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { ChannelServiceType } from "../types/services/ChannelServiceType";
import { prisma } from "../database/prisma";

export const ChannelService: ChannelServiceType = {
	getAll: async () => {
		const data = await prisma.homeworkChannel.findMany();
        return { channels: data };
	},

	openFile: async (discord_id, channel_id, file_id) => {

        return prisma.homeworkChannel.upsert({
            where: { channel_id },
            update: {
                file_id,
            },
            create: {
                channel_id,
                file_id,
            }
        })

	},

	edit: async (discord_id, channel_id, body) => {
        
        const channel = await prisma.homeworkChannel.findUnique({
            where: { channel_id },
            include: { homework_file: true }
        })

        if (!channel) {
            return { error: "Channel not found" };
        }

        const file = channel.homework_file;

        if (body.can_edit !== undefined && file.owner_id !== discord_id) {
            return { error: "You are not the owner of this file" };
        }

        return prisma.homeworkChannel.update({
            where: { channel_id },
            data: {
                enable_notification: body.enable_notification ?? channel.enable_notification,
                can_edit: body.can_edit ?? channel.can_edit,
            }
        }) 

	},
};
