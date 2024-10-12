import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import {
	FileServiceUpdateRequest,
	FileServiceUpdateResponse,
} from "../../../types/services/FileServiceType";
import { FileService } from "../../../services/file.service";
import { FilenameText } from "../../../templates/components/FilenameText";
import { FileSetting } from "../../../templates/messages/FileSetting";
import { getAllFilesChoices } from "../../../modules/getAllFilesChoices.module";

export const EditFile: SlashCommand = {
	name: "editcollection",
	description: "Edit a collection",
	options: [
		{
			name: "collection",
			description: "Select a Collection to be edit",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
		{
			name: "rename",
			description: "Rename this Collection",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		const fileId = interaction.options.getString("collection");
		const filename = interaction.options.getString("rename");

		if (!filename || !fileId) {
			return;
		}

		const body: FileServiceUpdateRequest = {
			filename: filename,
		};
		const response = await FileService.update(
			interaction.user.id,
			parseInt(fileId),
			body
		);
		const fileResponse: FileServiceUpdateResponse = response;

		const message = FileSetting(
			`✅ File has been renamed to ${FilenameText(fileResponse.filename)}`
		);
		await interaction.reply(message);
	},

	async onAutoCompleteInputed(interaction) {
		const choices = await getAllFilesChoices(interaction.user.id);
		await interaction.respond(choices);
	},
};
