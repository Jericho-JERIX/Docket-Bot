import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { FileServiceType } from "../types/services/FileServiceType";
import { prisma } from "../database/prisma";
import { formatFilename } from "../util/FormatFilename";

export const FileService: FileServiceType = {
	create: async (discord_id, channel_id, body) => {
		const file = await prisma.homeworkFile.create({
            data: {
                ...body,
                filename: formatFilename(body.filename),
                owner_id: discord_id,
            }
        })

        const channel = await prisma.homeworkChannel.upsert({
            where: { channel_id },
            update: {
                file_id: file.file_id,
            },
            create: {
                channel_id,
                file_id: file.file_id,
            }
        })

        return { file, channel }
	},
	getAll: async (discord_id) => {
		const files = await prisma.homeworkFile.findMany({
            where: { owner_id: discord_id }
        })

        return { files }
	},
	update: async (discord_id, file_id, body) => {
        const file = await prisma.homeworkFile.findUnique({ where: { file_id } })
        if (!file) {
            throw new Error("File not found")
        }
        if (file.owner_id !== discord_id) {
            throw new Error("You are not the owner of this file")
        }
		return prisma.homeworkFile.update({
            where: { file_id },
            data: {
                ...body,
                filename: formatFilename(body.filename),
            }
        })
	},
	delete: async (discord_id, file_id) => {
        const file = await prisma.homeworkFile.findUnique({ where: { file_id } })
        if (!file) {
            throw new Error("File not found")
        }
        if (file.owner_id !== discord_id) {
            throw new Error("You are not the owner of this file")
        }
		return prisma.homeworkFile.delete({
            where: { file_id }
        })
	},
};
