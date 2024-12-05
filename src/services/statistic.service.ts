import axios from "axios";
import { StatisticServiceType } from "../types/services/StatisticServiceType";
import { BACKEND_URL } from "../constants/service";
import { prisma } from "../database/prisma";

export const StatisticService: StatisticServiceType = {
	getGeneral: async () => {
		
        const totalHomeworks = await prisma.homework.count();
		const totalActiveHomeworks = await prisma.homework.count({
			where: { timestamp: { gte: new Date() }, is_active: true },
		});
        const totalChannels = await prisma.homeworkChannel.count();
        const totalFiles = await prisma.homeworkFile.count();

		return {
            total_homeworks: totalHomeworks,
            total_active_homeworks: totalActiveHomeworks,
            total_channels: totalChannels,
            total_files: totalFiles,
        };
	},
};
