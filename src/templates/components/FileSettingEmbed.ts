import { EmbedBuilder } from "discord.js";

export function FileSettingEmbed(
	description: string,
	footerText: string
): EmbedBuilder {
	let embed = new EmbedBuilder()
		.setTitle("📂 Flie Setting")
		.setColor("#947c66")
		.setDescription(description);

	if (footerText) {
		embed.setFooter({
			text: footerText,
		});
	}

	return embed;
}
