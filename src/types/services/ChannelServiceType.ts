import { DocketFile } from "./FileServiceType";

export type DocketChannel = {
	channel_id: string;
	file_id: number;
	can_edit: boolean;
	enable_notification: boolean;
};

export type PopulatedDocketChannel = {
	channel_id: string;
	file_id: DocketFile;
	can_edit: boolean;
	enable_notification: boolean;
};

export type ChannelServiceGetAllResponse = {
	channels: PopulatedDocketChannel[];
};

export type ChannelServiceOpenResponse = {
	file: DocketFile;
	channel: DocketChannel;
};

export type ChannelServiceEditRequest = {
	can_edit?: boolean;
	enable_notification?: boolean;
};

export type ChannelServiceType = {
	getAll: () => Promise<any>;
	openFile: (
		discord_id: string,
		channel_id: string,
		file_id: string
	) => Promise<any>;
	edit: (
		discord_id: string,
		channel_id: string,
		body: ChannelServiceEditRequest
	) => Promise<any>;
};
