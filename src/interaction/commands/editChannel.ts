import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";

export const EditChannel: SlashCommand = {
	name: "editchannel",
	description: "Edit channel",
	options: [
		{
			name: "enable-notification",
			description: "Always update todo-lists every 00:01 AM (GMT+7)",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
		{
			name: "anyone-can-edit",
			description:
				"Anyone that can use slash commands in this channel can edit todo-lists",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
	],
	async onCommandExecuted(interaction) {

    },
};
