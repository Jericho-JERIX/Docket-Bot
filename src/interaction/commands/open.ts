import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";

export const Open: SlashCommand = {
	name: "open",
	description: "Open a file for this channel",
	options: [
		{
			name: "file",
			description: "The file to open",
			type: ApplicationCommandOptionType.String,
			choices: [
				{ name: "Funny", value: "gif_funny" },
				{ name: "Meme", value: "gif_meme" },
				{ name: "Movie", value: "gif_movie" },
			],
		},
	],

	async onCommandExecuted(interaction) {
		const file = interaction.options.getString("file");
		if (!file) {
			interaction.reply("No file provided");
			return;
		}

		await interaction.reply(`Opening file ${file}`);
	},
};
