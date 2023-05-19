import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function InvalidDateError(): SlashCommandInteractionMessage {
	const embed = ErrorMesssageEmbed("❌ You entered an invalid date.");

	return { embeds: [embed] };
}
