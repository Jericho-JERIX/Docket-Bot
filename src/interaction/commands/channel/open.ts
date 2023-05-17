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
import { getAllFilesChoices } from "../../../modules/getAllFilesChoices.module";

export const Open: SlashCommand = {
	name: "open",
	description: "Open a Collection for this channel",
	options: [
		{
			name: "collection",
			description: "Select a Collection to be open",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
	],

	async onCommandExecuted(interaction) {
		const fileId = interaction.options.getString("collection");

		await ChannelService.openFile(
			interaction.user.id,
			interaction.channelId,
			String(fileId)
		);

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

	async onAutoCompleteInputed(interaction) {
		const choices = await getAllFilesChoices(interaction.user.id);
		await interaction.respond(choices);
	},
};
