import { CommandInteraction, Guild, PermissionsBitField } from "discord.js";

export function canManageThisChannel(
	guild: Guild,
	discordId: string,
	channelId: string
): boolean {
	return (
		guild.members.cache
			.get(discordId)
			?.permissionsIn(channelId)
			.has(PermissionsBitField.Flags.ManageChannels) ?? false
	);
}
