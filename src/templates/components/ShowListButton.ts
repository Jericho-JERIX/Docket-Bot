import { ButtonBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonStyle } from "discord.js";

export function ShowListButtonn() {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("🗳️ Show Todo-List")
			.setStyle(ButtonStyle.Primary)
			.setCustomId("showList")
	);
}
