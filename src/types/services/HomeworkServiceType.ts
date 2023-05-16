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
};

export type HomeworkServiceGetAllResponse = {
	file: DocketFile;
	total_homework_count: number;
	type_homework_count: number;
	homeworks: DocketHomework[];
};

export type HomeworkSeriveCreateRequest = {
	date: number;
	month: number;
	year: number;
	type: HomeworkType;
	label: string;
};

export type HomeworkSeriveUpdateRequest = {
	date?: number;
	month?: number;
	year?: number;
	type?: HomeworkType;
	label?: string;
};

export type HomeworkServiceType = {
	getAll: (
		channel_id: string,
		type: HomeworkType | undefined
	) => Promise<any>;
	create: (
		discord_id: string,
		channel_id: string,
		body: HomeworkSeriveCreateRequest
	) => Promise<any>;
	update: (
		discord_id: string,
		channel_id: string,
		homework_id: string,
		body: HomeworkSeriveUpdateRequest
	) => Promise<any>;
	delete: (
		discord_id: string,
		channel_id: string,
		homework_id: string
	) => Promise<any>;
};