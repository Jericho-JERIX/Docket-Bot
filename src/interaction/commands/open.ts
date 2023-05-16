import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";
import { FileService } from "../../services/file.service";
import { FileServiceGetAllRespond } from "../../types/services/FileServiceType";
import { SlashCommandOptionChoice } from "../../types/SlashCommandOption";
import { kebabToCapital } from "../../modules/kebabToCapital.module";
import { ChannelService } from "../../services/channel.service";
import { ChannelServiceOpenRespond } from "../../types/services/ChannelServiceType";
import { HomeworkService } from "../../services/homework.service";
import { HomeworkType } from "../../constants/homework";
import { HomeworkServiceGetAllResponse } from "../../types/services/HomeworkServiceType";
import { HomeworkList } from "../../templates/messages/HomeworkList";

export const Open: SlashCommand = {
	name: "open",
	description: "Open a file for this channel",
	options: [
		{
			name: "file",
			description: "The file to open",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
	],

	async onCommandExecuted(interaction) {
		const fileId = interaction.options.getString("file");

		await ChannelService.openFile(
			interaction.user.id,
			interaction.channelId,
			String(fileId)
		);

		const response = await HomeworkService.getAll(
			interaction.channelId,
			HomeworkType.ALL
		);

		const homeworkResponse: HomeworkServiceGetAllResponse = response.data;

		const message = HomeworkList(
			homeworkResponse.file,
			homeworkResponse.homeworks,
			HomeworkType.ALL
		);
		await interaction.reply(message);
	},

	async onAutoCompleteInputed(interaction) {
		const response = await FileService.getAll(interaction.user.id);
		// console.log(response, interaction.user.id);
		const fileResponse: FileServiceGetAllRespond = response.data;

		const choices: SlashCommandOptionChoice[] = fileResponse.files.map(
			(file) => ({
				name: `📁 ${kebabToCapital(file.filename)}`,
				value: String(file.file_id),
			})
		);

		await interaction.respond(choices);
	},
};
