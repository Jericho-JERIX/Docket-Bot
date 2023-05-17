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
			name: "homework",
			description: "The homework to edit",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
		{
			name: "date",
			description: "Date of the to-do item",
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: "month",
			description: "Month of the to-do item",
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: "label",
			description: "Describe the to-do item",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "type",
			description: "Type of the to-do item",
			type: ApplicationCommandOptionType.String,
			required: false,
			choices: TypeChoices,
		},
	],

	async onCommandExecuted(interaction) {
		const homeworkId = interaction.options.getString("homework");
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

		await HomeworkService.update(
			interaction.user.id,
			interaction.channelId,
			homeworkId,
			body
		);

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
