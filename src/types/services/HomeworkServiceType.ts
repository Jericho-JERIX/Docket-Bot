import { HomeworkType } from "../../constants/homework";
import { DocketFile } from "./FileServiceType";

export type DocketHomework = {
	homework_id: number;
	file_id: number;
	is_active: boolean;
	date: number;
	month: number;
	year: number;
	timestamp: number;
	day_name: string;
	type: HomeworkType;
	label: string;
	no_deadline: boolean;
	is_checked: boolean;
};

export type HomeworkServiceGetAllResponse = {
	file: DocketFile;
	total_homework_count: number;
	type_homework_count: number;
	homeworks: DocketHomework[];
};

export type HomeworkServiceCreateRequest = {
	date?: number;
	month?: number;
	year?: number;
	type: HomeworkType;
	label: string;
};

export type HomeworkServiceUpdateRequest = {
	date?: number;
	month?: number;
	year?: number;
	type?: HomeworkType;
	label?: string;
	no_deadline?: boolean;
};

export type HomeworkServiceCheckRequest = {
	is_checked: boolean;
};

export type HomeworkServiceType = {
	getAll: (
		channel_id: string,
		type: HomeworkType | undefined
	) => Promise<any>;
	create: (
		discord_id: string,
		channel_id: string,
		body: HomeworkServiceCreateRequest
	) => Promise<any>;
	update: (
		discord_id: string,
		channel_id: string,
		homework_id: string,
		body: HomeworkServiceUpdateRequest
	) => Promise<any>;
	delete: (
		discord_id: string,
		channel_id: string,
		homework_id: string
	) => Promise<any>;
	check: (
		discord_id: string,
		channel_id: string,
		homework_id: string,
		body: HomeworkServiceCheckRequest
	) => Promise<any>;
};
