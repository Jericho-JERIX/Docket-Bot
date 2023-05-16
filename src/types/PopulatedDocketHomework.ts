import {
	HomeworkAlertIcon,
	HomeworkType,
	HomeworkTypeIcon,
} from "../constants/homework";

export type PopulatedDocketHomework = {
	id: number;
	is_active: boolean;
	date: number;
	month: number;
	year: number;
	timestamp: number;
	day_name: string;
	type: HomeworkType;
	label: string;
	day_left: number;
	type_icon: HomeworkTypeIcon;
	alert_icon: HomeworkAlertIcon;
};
