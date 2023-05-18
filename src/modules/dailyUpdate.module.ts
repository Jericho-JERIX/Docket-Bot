import { ChannelType, Client } from "discord.js";
import { ChannelService } from "../services/channel.service";
import { ChannelServiceGetAllResponse } from "../types/services/ChannelServiceType";
import { HomeworkList } from "../templates/messages/HomeworkList";
import { listHomeworksByChannelId } from "./listHomeworksByChannelId.module";
import { HomeworkType } from "../constants/homework";

export async function broadcastTodoListToAllChannels(client: Client) {
	const response = await ChannelService.getAll();
	const data: ChannelServiceGetAllResponse = response.data;

	for (const channel of data.channels) {
		const targetChannel = client.channels.cache.get(channel.channel_id);

		if (!targetChannel || !channel.enable_notification) continue;

		const message = await listHomeworksByChannelId(
			channel.channel_id,
			HomeworkType.ALL
		);

		if (targetChannel.type === ChannelType.GuildText) {
			await targetChannel.send(message);
		} else if (targetChannel.type === ChannelType.GuildAnnouncement) {
			const annouced = await targetChannel.send(message);
			annouced.crosspost();
		}
	}
}

export async function triggerDailyUpdate(client: Client) {
	const today = new Date();
	const tomorrow = new Date(today);

	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 1, 0, 0);

	const beforeMidnight = tomorrow.getTime() - Date.now();

	console.log(
		`✅ Daily update activated (will be triggered in ${
			beforeMidnight / 1000
		}s)`
	);
	setTimeout(() => {
		broadcastTodoListToAllChannels(client);
		setInterval(() => {
			broadcastTodoListToAllChannels(client);
		}, 86400000);
	}, beforeMidnight);
}
