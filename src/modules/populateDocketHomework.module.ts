import { HomeworkAlertIcon, HomeworkTypeIcon } from "../constants/homework";
import { PopulatedDocketHomework } from "../types/PopulatedDocketHomework";
import { DocketHomework } from "../types/services/HomeworkServiceType";

export function populateDocketHomework(
	homework: DocketHomework
): PopulatedDocketHomework {
	const dayLeft = Math.floor(
		(homework.timestamp - Date.now()) / 86400000
	);
	const type =
		HomeworkTypeIcon[
			homework.type.toUpperCase() as keyof typeof HomeworkTypeIcon
		];

	let alert = HomeworkAlertIcon.LATER;
	if (dayLeft <= 2) {
		alert = HomeworkAlertIcon.HURRY;
	} else if (dayLeft <= 5) {
		alert = HomeworkAlertIcon.SOON;
	} else if (dayLeft <= 7) {
		alert = HomeworkAlertIcon.WEEK;
	}

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
		day_left: dayLeft,
		type_icon: type,
		alert_icon: alert,
		no_deadline: homework.no_deadline,
		is_checked: homework.is_checked,
	};
}
