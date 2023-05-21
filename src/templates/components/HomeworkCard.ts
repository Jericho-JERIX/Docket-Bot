import { ShorthenDayName } from "../../constants/dayName";
import { fixSpace } from "../../modules/fixSpace.module";
import { populateDocketHomework } from "../../modules/populateDocketHomework.module";
import { PopulatedDocketHomework } from "../../types/PopulatedDocketHomework";
import { DocketHomework } from "../../types/services/HomeworkServiceType";

export function HomeworkCard(homework: DocketHomework): string {
	const hw: PopulatedDocketHomework = populateDocketHomework(homework);

	const shorthenDayName =
		ShorthenDayName[
			hw.day_name.toUpperCase() as keyof typeof ShorthenDayName
		];

	let markdownText: string;

	if (!hw.is_checked)
		markdownText = `[\`${shorthenDayName}\`.\`${fixSpace(
			hw.date,
			2,
			"0"
		)}/${fixSpace(hw.month, 2, "0")}\`] ${hw.alert_icon} ${
			hw.day_left == 0
				? "**(`เดี๋ยวนี้!`)**"
				: `**(\`${fixSpace(hw.day_left, 3)}\` วัน)**`
		} ${hw.type_icon} \`${hw.label}\``;
	else {
		markdownText = `~~\`[${shorthenDayName}.${fixSpace(
			hw.date,
			2,
			"0"
		)}/${fixSpace(hw.month, 2, "0")}] ${hw.alert_icon} ${
			hw.day_left == 0
				? "(`เดี๋ยวนี้!`)"
				: `(${fixSpace(hw.day_left, 3)} วัน)`
		} ${hw.type_icon} ${hw.label}\`~~`;
	}

	return markdownText;
}
