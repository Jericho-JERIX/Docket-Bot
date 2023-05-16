import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../types/SlashCommandOption";
import { HomeworkService } from "../../services/homework.service";
import { HomeworkSeriveCreateRequest } from "../../types/services/HomeworkServiceType";
import { HomeworkType } from "../../constants/homework";
import { getYear } from "../../modules/getYear.module";
import { listHomeworksByChannelId } from "../../modules/listHomeworksByChannelId.module";

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
			description: "Date of the to-do item",
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "month",
			description: "Month of the to-do item",
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "label",
			description: "Describe the to-do item",
			type: ApplicationCommandOptionType.String,
			required: true,
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
		const date = interaction.options.getInteger("date");
		const month = interaction.options.getInteger("month");
		const label = interaction.options.getString("label");
		const type = interaction.options.getString("type");

		if (!date || !month || !label) {
			return;
		}

		const homeworkType = type ? type : "ASSIGNMENT";

		const body: HomeworkSeriveCreateRequest = {
			date: date,
			month: month,
			year: getYear(date, month),
			label: label,
			type: homeworkType as HomeworkType,
		};

		console.log(body);

		await HomeworkService.create(
			interaction.user.id,
			interaction.channelId,
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
};
