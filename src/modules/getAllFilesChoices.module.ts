import { FileService } from "../services/file.service";
import { SlashCommandOptionChoice } from "../types/SlashCommandOption";
import { FileServiceGetAllResponse } from "../types/services/FileServiceType";
import { kebabToCapital } from "./kebabToCapital.module";

export async function getAllFilesChoices(
	discordId: string
): Promise<SlashCommandOptionChoice[]> {
	const response = await FileService.getAll(discordId);
	const fileResponse: FileServiceGetAllResponse = response;

	const choices: SlashCommandOptionChoice[] = fileResponse.files.map(
		(file) => ({
			name: `📁 ${kebabToCapital(file.filename)}`,
			value: String(file.file_id),
		})
	);

	return choices;
}
