import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function TypeButton(): ActionRowBuilder<any> {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("📋 All")
			.setStyle(ButtonStyle.Secondary)
			.setCustomId("homeworklist-Type-ALL"),
		new ButtonBuilder()
			.setLabel("📝 Assignment")
			.setStyle(ButtonStyle.Primary)
			.setCustomId("homeworklist-Type-Assignment"),
		new ButtonBuilder()
			.setLabel("🔔 Alert")
			.setStyle(ButtonStyle.Success)
			.setCustomId("homeworklist-Type-Alert"),
		new ButtonBuilder()
			.setLabel("🔥 Exam")
			.setStyle(ButtonStyle.Danger)
			.setCustomId("homeworklist-Type-Exam")
	);
}
