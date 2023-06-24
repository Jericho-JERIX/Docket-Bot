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

export const DeleteFile: SlashCommand = {
	name: "deletecollection",
	description: "Delete a collection",
	options: [
		{
			name: "collection",
			description: "Select a Collection to be delete",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
		{
			name: "confirmation",
			description: "Confirm your deletion by typing 'delete'",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		const fileId = interaction.options.getString("collection");
		const confirmation = interaction.options.getString("confirmation");

		if (
			!fileId ||
			!confirmation ||
			confirmation.toLowerCase() !== "delete"
		) {
			return;
		}

		await FileService.delete(interaction.user.id, fileId);

		const message = FileSetting(`✅ File has been deleted`);
		await interaction.reply(message);
	},

	async onAutoCompleteInputed(interaction) {
		const choices = await getAllFilesChoices(interaction.user.id);
		await interaction.respond(choices);
	},
};
