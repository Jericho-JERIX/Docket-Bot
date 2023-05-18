import { Text } from "../../../constants/text";
import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function NoHomeworkPermissionError(): SlashCommandInteractionMessage {
	const embed = ErrorMesssageEmbed(
		`❌ You don't have permission to edit this ${Text.Collection}`,
		"You may edit this Collection if the owner has enabled the 'Anyone can edit' option"
	);

	return { embeds: [embed] };
}
