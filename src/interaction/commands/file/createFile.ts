import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { FileSetting } from "../../../templates/messages/FileSetting";
import { FileService } from "../../../services/file.service";
import {
	FileServiceCreateRequest,
	FileServiceCreateResponse,
} from "../../../types/services/FileServiceType";
import { FilenameText } from "../../../templates/components/FilenameText";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import { HomeworkType } from "../../../constants/homework";

export const CreateFile: SlashCommand = {
	name: "createfile",
	description: "Create a file",
	options: [
		{
			name: "filename",
			description: "The name of the file",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		const filename = interaction.options.getString("filename");

		if (filename === null) {
			return;
		}

		const body: FileServiceCreateRequest = {
			filename: filename,
		};
		const reponse = await FileService.create(
			interaction.user.id,
			interaction.channelId,
			body
		);
		const fileResponse: FileServiceCreateResponse = reponse.data;

		const message = FileSetting(
			`✅ ${FilenameText(
				fileResponse.file.filename
			)} has been created and opened in <#${interaction.channelId}>`,
			"Create your first Todo by using /create command"
		);
		await interaction.reply(message);
	},
};
