import { SlashCommandInteractionMessage } from "../../types/SlashCommandInteractionMessage";
import { FileSettingEmbed } from "../components/FileSettingEmbed";

export function FileSetting(
	description: string,
	footerText?: string
): SlashCommandInteractionMessage {
	const embed = FileSettingEmbed(description,footerText);
	return {
		embeds: [embed],
	};
}
