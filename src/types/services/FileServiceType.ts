export type FileServiceType = {
	getAll: (discord_id: string) => Promise<any>;
	create: (discord_id: string, channel_id: string, body: any) => Promise<any>;
	edit: (discord_id: string, file_id: string, body: any) => Promise<any>;
	delete: (discord_id: string, file_id: string) => Promise<any>;
};
