import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";
import {
	HomeworkSeriveUpdateRequest,
	HomeworkServiceGetAllResponse,
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

export const Edit: SlashCommand = {
	name: "edit",
	description: "Edit a homework",
	options: [
		{
			name: "todo-item",
			description: "Select a To-do item to be edit",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
		{
			name: "date",
			description: "New due date for this To-do item",
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: "month",
			description: "New due month for this To-do item",
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: "label",
			description: "Enter a new label",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "type",
			description: "Change the type of this To-do item",
			type: ApplicationCommandOptionType.String,
			required: false,
			choices: TypeChoices,
		},
	],

	async onCommandExecuted(interaction) {
		const homeworkId = interaction.options.getString("todo-item");
		const date = interaction.options.getInteger("date");
		const month = interaction.options.getInteger("month");
		const label = interaction.options.getString("label");
		const type = interaction.options.getString("type");

		if (!homeworkId) {
			return;
		}

		let body: HomeworkSeriveUpdateRequest = {};

		if (date) body.date = date;
		if (month) body.month = month;
		if (label) body.label = label;
		if (type) body.type = type as HomeworkType;

		const response = await HomeworkService.update(
			interaction.user.id,
			interaction.channelId,
			homeworkId,
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
			input
		);
		await interaction.respond(choices);
	},
};
