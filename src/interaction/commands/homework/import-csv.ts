import { ApplicationCommandOptionType } from "discord.js";
import { HomeworkType } from "../../../constants/homework";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import HomeworkFileService from "../../../services/file.service";
import HomeworkServiceV2 from "../../../services/homework.service";
import { SlashCommand } from "../../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";

const TypeChoices: SlashCommandOptionChoice[] = [
	{ name: "📝 Assignment", value: "ASSIGNMENT" },
	{ name: "🔔 Alert", value: "ALERT" },
	{ name: "🔥 Exam", value: "EXAM" },
];

export const ImportCSV: SlashCommand = {
	name: "import-csv",
	description: "Import Homeworks into new File from CSV",
	options: [
		{
			name: "csv",
			description: "Select a To-do item to be uncheck",
			type: ApplicationCommandOptionType.Attachment,
			required: true,
			autocomplete: true,
		},
	],

	async onCommandExecuted(interaction) {
		const csv = interaction.options.getAttachment("csv");

		if (!csv || !csv.contentType?.includes("text/csv")) {
			return;
		}

		const file = await HomeworkFileService.getByChannelId(
			interaction.channelId
		);

		await HomeworkServiceV2.importFromCSV(
			csv.url,
			file.file_id
		);

		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL,
			""
		);
		await interaction.reply(message);
    },
};
