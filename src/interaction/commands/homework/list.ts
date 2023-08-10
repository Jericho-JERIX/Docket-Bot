import { SlashCommand } from "../../../types/SlashCommand";
import { HomeworkType } from "../../../constants/homework";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import { ApplicationCommandOptionType } from "discord.js";

export const List: SlashCommand = {
	name: "list",
	description:
		"List all To-do items that are in Collection opened in this Channel",
	options: [
		{
			name: "search",
			description: "Search for a To-do item",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
	],

	async onCommandExecuted(interaction) {
		let keyword = interaction.options.getString("search");

		if (!keyword) {
			keyword = "";
		}

		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL,
			keyword
		);
		await interaction.reply(message);
	},

	async onButtonPressed(interaction) {
		const message = await listHomeworksByChannelId(
			interaction.channelId,
			interaction.customId as HomeworkType,
			""
		);
		await interaction.update(message);
	},
};
