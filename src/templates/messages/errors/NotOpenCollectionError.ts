import { EmbedBuilder } from "discord.js";
import { ColorPalette } from "../../../constants/colorPalette";
import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { Text } from "../../../constants/text";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function NotOpenCollectionError(): SlashCommandInteractionMessage {
	const embed = ErrorMesssageEmbed(
		`❌ This ${Text.Channel} has not open ${Text.Collection} yet`,
		"Use /open to select a Collection to display for this Channel"
	);
	return {
		embeds: [embed],
	};
}
