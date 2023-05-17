import { SlashCommandInteractionMessage } from "../../types/SlashCommandInteractionMessage";
import { ChannelDetailEmbed } from "../components/ChannelDetailEmbed";

export function ChannelDetail(
	discordId: string,
	channelId: string,
	canEdit: boolean,
	enableNotification: boolean
): SlashCommandInteractionMessage {
	const embed = ChannelDetailEmbed(
		discordId,
		channelId,
		canEdit,
		enableNotification
	);
	return {
		embeds: [embed],
	};
}
