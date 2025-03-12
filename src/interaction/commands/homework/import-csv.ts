import { ApplicationCommandOptionType } from "discord.js";
import { HomeworkType } from "../../../constants/homework";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import ChannelServiceV2 from "../../../services/channel.service";
import HomeworkFileService from "../../../services/file.service";
import HomeworkServiceV2 from "../../../services/homework.service";
import { CustomError } from "../../../templates/messages/errors/CustomError";
import { NoChannelPermissionnError } from "../../../templates/messages/errors/NoChannelPermissionnError";
import { SlashCommand } from "../../../types/SlashCommand";
import { SlashCommandOptionChoice } from "../../../types/SlashCommandOption";
import { NoHomeworkPermissionError } from "../../../templates/messages/errors/NoHomeworkPermissionError";
import { ImportCSVInfo } from "../../../templates/messages/info/ImportCSVInfo";

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
			required: false,
			autocomplete: true,
		},
	],

	async onCommandExecuted(interaction) {
		const csv = interaction.options.getAttachment("csv");

		if (!csv || !csv.contentType?.includes("text/csv")) {
			const message = ImportCSVInfo();
            await interaction.reply({ ...message, ephemeral: true });
            return;
		}

		const userId = interaction.user.id;
		const channelId = interaction.channelId;

		const permission = await ChannelServiceV2.isUserCanEditChannel(
			userId,
			channelId
		);
		if (!permission) {
			const message = NoHomeworkPermissionError();
			await interaction.reply({ ...message, ephemeral: true });
            return;
		}

		const file = await HomeworkFileService.getByChannelId(channelId);

		const response = await HomeworkServiceV2.importFromCSV(
			csv.url,
			file.file_id
		);

		if (response instanceof Error) {
			const message = CustomError(response.message);
			await interaction.reply({ ...message, ephemeral: true });
            return;
		}

		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL,
			""
		);
		await interaction.reply(message);
        return;
	},
};
