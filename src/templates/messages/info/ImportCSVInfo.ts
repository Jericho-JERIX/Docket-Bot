import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";
import { InfoMessageEmbed } from "../../components/InfoMessageEmbed";

export function ImportCSVInfo(): SlashCommandInteractionMessage {
    const embed = InfoMessageEmbed(
        "ℹ️ You can download example of CSV file as shown above."
    );

    return { embeds: [embed], files: ['./assets/import-homework-template.csv'] };
}
