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

const TypeChoices: SlashCommandOptionChoice[] = [
	{ name: "📝 Assignment", value: "ASSIGNMENT" },
	{ name: "🔔 Alert", value: "ALERT" },
	{ name: "🔥 Exam", value: "EXAM" },
];

export const Delete: SlashCommand = {
	name: "delete",
	description: "Delete a To-do item",
	options: [
		{
			name: "todo-item",
			description: "Select a To-do item to be delete",
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
		},
		{
			name: "confirmation",
			description: "Confirm your deletion by typing 'delete'",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		const homeworkId = interaction.options.getString("todo-item");
		const confirmation = interaction.options.getString("confirmation");

		if (
			!confirmation ||
			!homeworkId ||
			confirmation.toLowerCase() !== "delete"
		) {
			return;
		}

		await HomeworkService.delete(
			interaction.user.id,
			interaction.channelId,
			String(homeworkId)
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
		const response = await HomeworkService.getAll(
			interaction.channelId,
			HomeworkType.ALL
		);

		const homeworkServiceResponse: HomeworkServiceGetAllResponse =
			response.data;
		const filteredHomeworks = homeworkServiceResponse.homeworks
			.filter((homework) => homework.label.includes(input))
			.map((homework) => ({
				name: ClearedHomeworkCard(homework),
				value: String(homework.homework_id),
			}));

		await interaction.respond(filteredHomeworks);
	},
};
