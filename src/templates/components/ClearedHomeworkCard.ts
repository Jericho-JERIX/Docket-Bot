import { ShorthenDayName } from "../../constants/dayName";
import { fixSpace } from "../../modules/fixSpace.module";
import { populateDocketHomework } from "../../modules/populateDocketHomework.module";
import { PopulatedDocketHomework } from "../../types/PopulatedDocketHomework";
import { DocketHomework } from "../../types/services/HomeworkServiceType";

export function ClearedHomeworkCard(homework: DocketHomework): string {
	const hw: PopulatedDocketHomework = populateDocketHomework(homework);

	const shorthenDayName =
		ShorthenDayName[
			hw.day_name.toUpperCase() as keyof typeof ShorthenDayName
		];

	let result: string = "";

	if (hw.no_deadline) {
		result = `${hw.type_icon} ${hw.label}`;
	} else {
		if (hw.day_left == 0) {
			result = `[${shorthenDayName}.${fixSpace(
				hw.date,
				2,
				"0"
			)}/${fixSpace(hw.month, 2, "0")}] ${hw.alert_icon} (เดี๋ยวนี้!) ${
				hw.type_icon
			} ${hw.label}`;
		} else {
			result = `[${shorthenDayName}.${fixSpace(
				hw.date,
				2,
				"0"
			)}/${fixSpace(hw.month, 2, "0")}] ${hw.alert_icon} (${fixSpace(
				hw.day_left,
				3
			)} วัน) ${hw.type_icon} ${hw.label}`;
		}
	}

	if (result.length > 99) {
		result = result.slice(0, 96) + "...";
	}
	return result;
}
