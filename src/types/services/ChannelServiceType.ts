export type ChannelServiceType = {
	getAll: () => Promise<any>;
	openFile: (
		discord_id: string,
		channel_id: string,
		file_id: string
	) => Promise<any>;
	edit: (discord_id: string, channel_id: string, body: any) => Promise<any>;
};
