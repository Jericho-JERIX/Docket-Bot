import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function CustomError(message: string): SlashCommandInteractionMessage {
    const embed = ErrorMesssageEmbed(
        `❌ ${message}`
    );

    return { embeds: [embed] };
}
