import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { FileServiceCreateRequest, FileServiceType, FileServiceUpdateRequest } from "../types/services/FileServiceType";
import { prisma } from "../database/prisma";
import { formatFilename } from "../util/FormatFilename";

export const FileService = {
	create: async (discord_id: string, channel_id: string, body: FileServiceCreateRequest) => {
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

        return { status: 200, file, channel }
	},
	getAll: async (discord_id: string) => {
		const files = await prisma.homeworkFile.findMany({
            where: { owner_id: discord_id }
        })

        return { files }
	},
	update: async (discord_id: string, file_id: number, body: FileServiceUpdateRequest) => {
        const file = await prisma.homeworkFile.findUnique({ where: { file_id } })
        if (!file) {
            throw new Error("File not found")
        }
        if (file.owner_id !== discord_id) {
            throw new Error("You are not the owner of this file")
        }
		const response = await prisma.homeworkFile.update({
            where: { file_id },
            data: {
                ...body,
                filename: formatFilename(body.filename),
            }
        })

        return { status: 200, ...response }
	},
	delete: async (discord_id: string, file_id: number) => {
        const file = await prisma.homeworkFile.findUnique({ where: { file_id } })
        if (!file) {
            throw new Error("File not found")
        }
        if (file.owner_id !== discord_id) {
            throw new Error("You are not the owner of this file")
        }
		const response = await prisma.homeworkFile.delete({
            where: { file_id }
        })

        return { status: 204, ...response }
	},
};
