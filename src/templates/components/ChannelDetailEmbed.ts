import { EmbedBuilder } from "discord.js";
import { EnableSwitchText } from "./EnableSwtichText";

export function ChannelDetailEmbed(
	discordId: string,
	channelId: string,
	canEdit: boolean,
	enableNotification: boolean
): EmbedBuilder {
	return new EmbedBuilder()
		.setTitle("🔧 Channel Configuration")
		.setDescription(`Channel: <#${channelId}>`)
		.setColor("#947c66")
		.setFields([
			{
				name: "👑 Owner",
				value: `<@!${discordId}>`,
				inline: false,
			},
			{
				name: `${enableNotification ? "🔔" : "🔕"} Enable notification`,
				value: EnableSwitchText(enableNotification),
				inline: true,
			},

			{
				name: `${canEdit ? "🔓" : "🔒"} Anyone Can Edit`,
				value: EnableSwitchText(canEdit),
				inline: true,
			},
		]);
}
