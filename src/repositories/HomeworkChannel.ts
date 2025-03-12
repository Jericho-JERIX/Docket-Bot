import { prisma } from "../database/prisma";

export default class HomeworkChannelRepository {
    static async getByChannelId(channelId: string) {
        const channel = await prisma.homeworkChannel.findUniqueOrThrow({
            where: { channel_id: channelId },
            include: { homework_file: true },
        })
        return channel;
    }
}