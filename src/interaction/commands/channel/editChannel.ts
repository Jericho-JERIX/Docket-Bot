import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../../../types/SlashCommand";
import { ChannelDetail } from "../../../templates/messages/ChannelDetail";
import {
	ChannelServiceEditRequest,
	DocketChannel,
} from "../../../types/services/ChannelServiceType";
import { ChannelService } from "../../../services/channel.service";

export const EditChannel: SlashCommand = {
	name: "editchannel",
	description: "Edit channel",
	options: [
		{
			name: "enable-notification",
			description: "Always update todo-lists every 00:01 AM (GMT+7)",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
		{
			name: "anyone-can-edit",
			description:
				"Anyone that can use slash commands in this channel can edit todo-lists",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
	],
	async onCommandExecuted(interaction) {
		const enableNotification = interaction.options.getBoolean(
			"enable-notification"
		);
		const anyoneCanEdit = interaction.options.getBoolean("anyone-can-edit");

		let body: ChannelServiceEditRequest = {};

		if (enableNotification !== null)
			body.enable_notification = enableNotification;
		if (anyoneCanEdit !== null) body.can_edit = anyoneCanEdit;

		const response = await ChannelService.edit(
			interaction.user.id,
			interaction.channelId,
			body
		);

		const channelResponse: DocketChannel = response.data;

		const message = ChannelDetail(
			interaction.user.id,
			interaction.channelId,
			channelResponse.can_edit,
			channelResponse.enable_notification
		);

		await interaction.reply(message);
	},
};
