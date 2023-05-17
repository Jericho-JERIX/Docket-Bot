import { EmbedBuilder } from "discord.js";
import { ColorPalette } from "../../../constants/colorPalette";
import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { Text } from "../../../constants/text";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function NotOpenCollectionError(): SlashCommandInteractionMessage {
	const embed = ErrorMesssageEmbed(
		`❌ This ${Text.Channel} has not selected ${Text.Collection} yet`,
		"To select a Collection, use /open and select a Collection for this Channel"
	);
	return {
		embeds: [embed],
	};
}
