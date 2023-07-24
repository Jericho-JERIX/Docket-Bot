import { ShorthenDayName } from "../../constants/dayName";
import { fixSpace } from "../../modules/fixSpace.module";
import { populateDocketHomework } from "../../modules/populateDocketHomework.module";
import { PopulatedDocketHomework } from "../../types/PopulatedDocketHomework";
import { DocketHomework } from "../../types/services/HomeworkServiceType";

export function ClearedHomeworkCard(homework: DocketHomework): string {
	const hw: PopulatedDocketHomework = populateDocketHomework(homework);

	let modifiedLabel = hw.label;

	if (hw.label.length > 99) {
		modifiedLabel = hw.label.slice(0, 96) + "...";
	}

	const shorthenDayName =
		ShorthenDayName[
			hw.day_name.toUpperCase() as keyof typeof ShorthenDayName
		];

	if (hw.day_left == 0) {
		return `[${shorthenDayName}.${fixSpace(hw.date, 2, "0")}/${fixSpace(
			hw.month,
			2,
			"0"
		)}] ${hw.alert_icon} (เดี๋ยวนี้!) ${hw.type_icon} ${modifiedLabel}`;
	} else {
		return `[${shorthenDayName}.${fixSpace(hw.date, 2, "0")}/${fixSpace(
			hw.month,
			2,
			"0"
		)}] ${hw.alert_icon} (${fixSpace(hw.day_left, 3)} วัน) ${
			hw.type_icon
		} ${modifiedLabel}`;
	}
}
