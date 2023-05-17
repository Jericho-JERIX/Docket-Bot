import { EmbedBuilder } from "discord.js";
import { ColorPalette } from "../../constants/colorPalette";

export function ErrorMesssageEmbed(
	message: string,
	footerText?: string
): EmbedBuilder {
	let embed = new EmbedBuilder()
		.setDescription(message)
		.setColor(ColorPalette.ERROR);
	if (footerText) {
		embed.setFooter({
			text: footerText,
		});
	}
	return embed;
}
