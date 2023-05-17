import { DocketChannel } from "./ChannelServiceType";

export type DocketFile = {
	file_id: number;
	owner_id: string;
	filename: string;
};

export type FileServiceGetAllRespond = {
	files: DocketFile[];
};

export type FileServiceCreateRequest = {
	filename: string;
};

export type FileServiceCreateResponse = {
	file: DocketFile;
	channel: DocketChannel;
};

export type FileServiceUpdateRequest = {
	filename: string;
};

export type FileServiceType = {
	getAll: (discord_id: string) => Promise<any>;
	create: (
		discord_id: string,
		channel_id: string,
		body: FileServiceCreateRequest
	) => Promise<any>;
	update: (
		discord_id: string,
		file_id: string,
		body: FileServiceUpdateRequest
	) => Promise<any>;
	delete: (discord_id: string, file_id: string) => Promise<any>;
};
