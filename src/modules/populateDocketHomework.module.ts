import { HomeworkAlertIcon, HomeworkTypeIcon } from "../constants/homework";
import { PopulatedDocketHomework } from "../types/PopulatedDocketHomework";
import { DocketHomework } from "../types/services/HomeworkServiceType";

export function populateDocketHomework(
	homework: DocketHomework
): PopulatedDocketHomework {
	return {
		id: homework.homework_id,
		is_active: homework.is_active,
		date: homework.date,
		month: homework.month,
		year: homework.year,
		timestamp: homework.timestamp,
		day_name: homework.day_name,
		type: homework.type,
		label: homework.label,
		day_left: Math.floor(
			(homework.timestamp * 1000 - Date.now()) / 86400000
		),
		type_icon: HomeworkTypeIcon.ALERT,
		alert_icon: HomeworkAlertIcon.HURRY,
	};
}
