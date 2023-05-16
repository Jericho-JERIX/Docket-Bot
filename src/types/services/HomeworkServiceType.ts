export enum HomeworkType {
	ASSIGNMENT = "ASSIGNMENT",
	EXAM = "EXAM",
	ALERT = "ALERT",
	ALL = "ALL",
}

export type HomeworkServiceType = {
	getAll: (channel_id: string, type: HomeworkType | undefined) => Promise<any>;
	create: (discord_id: string, channel_id: string, body: any) => Promise<any>;
	edit: (
		discord_id: string,
		channel_id: string,
		homework_id: string,
		body: any
	) => Promise<any>;
	delete: (
		discord_id: string,
		channel_id: string,
		homework_id: string
	) => Promise<any>;
};
