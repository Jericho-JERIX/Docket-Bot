import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";
import {
	HomeworkServiceUpdateRequest,
	HomeworkServiceGetAllResponse,
	HomeworkServiceCheckRequest,
} from "../../../types/services/HomeworkServiceType";
import { HomeworkType } from "../../../constants/homework";
import { HomeworkService } from "../../../services/homework.service";
import { HomeworkCard } from "../../../templates/components/HomeworkCard";
import { ClearedHomeworkCard } from "../../../templates/components/ClearedHomeworkCard";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import { getAllHomeworkChoices } from "../../../modules/getAllHomeworkChoices.module";
import { NoHomeworkPermissionError } from "../../../templates/messages/errors/NoHomeworkPermissionError";
import { InvalidDateError } from "../../../templates/messages/errors/InvalidDateError";

const TypeChoices: SlashCommandOptionChoice[] = [
	{ name: "📝 Assignment", value: "ASSIGNMENT" },
	{ name: "🔔 Alert", value: "ALERT" },
	{ name: "🔥 Exam", value: "EXAM" },
];

export const Uncheck: SlashCommand = {
	name: "uncheck",
	description: "Unmark a Todo-Item that already completed",
	options: [
		{
			name: "todo-item",
			description: "Select a To-do item to be uncheck",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
	],

	async onCommandExecuted(interaction) {
		const homeworkId = interaction.options.getString("todo-item");

		if (!homeworkId) {
			return;
		}

		let body: HomeworkServiceCheckRequest = {
			is_checked: false,
		};

		const response = await HomeworkService.check(
			interaction.user.id,
			interaction.channelId,
			String(homeworkId),
			body
		);

		switch (response.status) {
			case 400:
				await interaction.reply(InvalidDateError());
				return;
			case 401:
				await interaction.reply(NoHomeworkPermissionError());
				return;
		}

		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL
		);

		await interaction.reply(message);
	},

	async onButtonPressed(interaction) {
		const message = await listHomeworksByChannelId(
			interaction.channelId,
			interaction.customId as HomeworkType
		);

		await interaction.update(message);
	},

	async onAutoCompleteInputed(interaction) {
		const input = interaction.options.getFocused();
		const choices = await getAllHomeworkChoices(
			interaction.channelId,
			(homework) =>
				homework.day_name.toLowerCase().includes(input.toLowerCase()) &&
				homework.is_checked
		);
		await interaction.respond(choices);
	},
};
