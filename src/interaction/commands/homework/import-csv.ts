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
        {
            name: "name",
            description: "Enter the name for this Collection",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async onCommandExecuted(interaction) {
        const csv = interaction.options.getAttachment("csv")
        const filename = interaction.options.getString("name")

        if (!filename || !csv) {
            return;
        }

        if (!csv.contentType?.includes('text/csv')) {
            return;
        }

        console.log(csv)
        interaction.reply("Done")
    },
};
