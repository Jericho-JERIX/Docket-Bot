import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { HomeworkType } from "../../constants/homework";

export function TypeButton(): ActionRowBuilder<any> {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("📋 All")
			.setStyle(ButtonStyle.Secondary)
			.setCustomId(HomeworkType.ALL),
		new ButtonBuilder()
			.setLabel("📝 Assignment")
			.setStyle(ButtonStyle.Primary)
			.setCustomId(HomeworkType.ASSIGNMENT),
		new ButtonBuilder()
			.setLabel("🔔 Alert")
			.setStyle(ButtonStyle.Success)
			.setCustomId(HomeworkType.ALERT),
		new ButtonBuilder()
			.setLabel("🔥 Exam")
			.setStyle(ButtonStyle.Danger)
			.setCustomId(HomeworkType.EXAM)
	);
}
