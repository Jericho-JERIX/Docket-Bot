import { ActivityType, Client } from "discord.js";
import { Text } from "../constants/text";
import { StatisticService } from "../services/statistic.service";
import { StatisticServiceGetGeneralResponse } from "../types/services/StatisticServiceType";

async function setPresence(client: Client) {
	const response = await StatisticService.getGeneral();
	const statisticResponse: StatisticServiceGetGeneralResponse = response;
	client.user?.setPresence({
		activities: [
			{
				name: `📝${statisticResponse.total_homeworks} 📁${statisticResponse.total_files} #️⃣${statisticResponse.total_channels}`,
				type: ActivityType.Watching,
			},
		],
	});
}

export function updateStatisticPresence(client: Client) {
	setPresence(client);
	setInterval(() => setPresence(client), 300000);
}
