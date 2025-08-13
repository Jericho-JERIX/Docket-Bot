import { SlashCommand } from "../../../types/SlashCommand";
import { HomeworkType } from "../../../constants/homework";
import { listHomeworksByChannelId } from "../../../modules/listHomeworksByChannelId.module";
import { ApplicationCommandOptionType } from "discord.js";
import { HomeworkService } from "../../../services/homework.service";
import CSVService from "../../../services/csv.service";
import { DocketHomework } from "../../../types/services/HomeworkServiceType";

export const List: SlashCommand = {
	name: "list",
	description:
		"List all To-do items that are in Collection opened in this Channel",
	options: [
		{
			name: "search",
			description: "Search for a To-do item",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
	],

	async onCommandExecuted(interaction) {
		let keyword = interaction.options.getString("search");

		if (!keyword) {
			keyword = "";
		}

		const message = await listHomeworksByChannelId(
			interaction.channelId,
			HomeworkType.ALL,
			keyword
		);
		await interaction.reply(message);
	},

	async onButtonPressed(interaction) {
		if (interaction.customId === 'export-csv') {
			const response = await HomeworkService.getAll(
				interaction.channelId,
				HomeworkType.ALL,
				undefined
			);
			
			const homeworklist = response.homeworks as DocketHomework[]
			const suffix = CSVService.generateDatetimeSuffix()
			const filename = response.file.filename + '_' + suffix + '.csv'
			const result = CSVService.exportToCsv(homeworklist, filename)
			await interaction.reply({ files: [{
				attachment: result.filepath,
				name: result.filename,
			}], ephemeral: true});
			
		} else {
			const message = await listHomeworksByChannelId(
				interaction.channelId,
				interaction.customId as HomeworkType,
				""
			);
			await interaction.update(message);
		}
	},
};
