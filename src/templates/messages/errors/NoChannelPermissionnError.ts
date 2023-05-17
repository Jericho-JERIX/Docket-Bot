import { SlashCommandInteractionMessage } from "../../../types/SlashCommandInteractionMessage";
import { ErrorMesssageEmbed } from "../../components/ErrorMessageEmbed";

export function NoChannelPermissionnError(): SlashCommandInteractionMessage {
	const embed = ErrorMesssageEmbed(
		"❌ You need `Manage Channels` permission to use this command"
	);

	return { embeds: [embed] };
}
