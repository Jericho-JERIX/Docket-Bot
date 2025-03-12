import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function InvalidCSVError(message: string): SlashCommandInteractionMessage {
    const embed = ErrorMesssageEmbed(
        "❌ Invalid."
    );

    return { embeds: [embed] };
}
