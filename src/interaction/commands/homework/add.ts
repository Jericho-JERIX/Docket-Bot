import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";
import { HomeworkService } from "../../../services/homework.service";
import { HomeworkServiceCreateRequest } from "../../../types/services/HomeworkServiceType";
import { HomeworkType } from "../../../constants/homework";
import { getYear } from "../../../modules/getYear.module";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import { NoHomeworkPermissionError } from "../../../templates/messages/errors/NoHomeworkPermissionError";
import { InvalidDateError } from "../../../templates/messages/errors/InvalidDateError";

const TypeChoices: SlashCommandOptionChoice[] = [
	{ name: "📝 Assignment (Default)", value: "ASSIGNMENT" },
	{ name: "🔔 Alert", value: "ALERT" },
	{ name: "🔥 Exam", value: "EXAM" },
];

export const Add: SlashCommand = {
	name: "add",
	description: "Add a to-do item",
	options: [
		{
			name: "date",
			description: "Due date for the To-do item",
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "month",
			description: "Due month of the To-do item",
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "label",
			description: "Describe what you need to do within this date",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "type",
			description: "Type of the To-do item (Default: Assignment)",
			type: ApplicationCommandOptionType.String,
			required: false,
			choices: TypeChoices,
		},
	],

	async onCommandExecuted(interaction) {
		const date = interaction.options.getInteger("date");
		const month = interaction.options.getInteger("month");
		const label = interaction.options.getString("label");
		const type = interaction.options.getString("type");

		if (!label) {
			return;
		}

		const homeworkType = type ? type : "ASSIGNMENT";
		let body: HomeworkServiceCreateRequest;

		if (!date || !month) {
			body = {
				label: label,
				type: homeworkType as HomeworkType,
			};
		} else {
			body = {
				date: date,
				month: month,
				year: getYear(date, month),
				label: label,
				type: homeworkType as HomeworkType,
			};
		}

		const response = await HomeworkService.create(
			interaction.user.id,
			interaction.channelId,
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
			HomeworkType.ALL,
			""
		);
		await interaction.reply(message);
	},

	async onButtonPressed(interaction) {
		const message = await listHomeworksByChannelId(
			interaction.channelId,
			interaction.customId as HomeworkType,
			""
		);
		await interaction.update(message);
	},
};
