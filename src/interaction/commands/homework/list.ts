import { SlashCommand } from "../../../types/SlashCommand";
import { HomeworkType } from "../../../constants/homework";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";

export const List: SlashCommand = {
	name: "list",
	description:
		"List all To-do items that are in Collection opened in this Channel",
	options: [],

	async onCommandExecuted(interaction) {
		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL
		);
		await interaction.reply(message);
	},

	async onButtonPressed(interaction) {
		const message = await listHomeworksByChannelId(
			interaction.channelId,
			interaction.customId as HomeworkType
		);
		await interaction.update(message);
	},
};
