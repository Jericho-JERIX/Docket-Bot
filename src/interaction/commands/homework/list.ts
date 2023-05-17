import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	InteractionUpdateOptions,
} from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { FileService } from "../../../services/file.service";
import { FileServiceGetAllRespond } from "../../../types/services/FileServiceType";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";
import { kebabToCapital } from "../../../modules/kebabToCapital.module";
import { ChannelService } from "../../../services/channel.service";
import { ChannelServiceOpenRespond } from "../../../types/services/ChannelServiceType";
import { HomeworkService } from "../../../services/homework.service";
import { HomeworkType } from "../../../constants/homework";
import { HomeworkServiceGetAllResponse } from "../../../types/services/HomeworkServiceType";
import { HomeworkList } from "../../../templates/messages/HomeworkList";
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
