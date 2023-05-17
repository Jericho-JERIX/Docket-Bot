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

	if (hw.day_left == 0) {
		return `[\`${shorthenDayName}\`.\`${fixSpace(
			hw.date,
			2,
			"0"
		)}/${fixSpace(hw.month, 2, "0")}\`] ${
			hw.alert_icon
		} **(\`เดี๋ยวนี้!\`)** ${hw.type_icon} \`[${fixSpace(
			hw.id,
			4,
			"0"
		)}]\` \`${hw.label}\``;
	} else {
		return `[\`${shorthenDayName}\`.\`${fixSpace(
			hw.date,
			2,
			"0"
		)}/${fixSpace(hw.month, 2, "0")}\`] ${hw.alert_icon} **(\`${fixSpace(
			hw.day_left,
			3
		)}\` วัน)** ${hw.type_icon} \`[${fixSpace(hw.id, 4, "0")}]\` \`${
			hw.label
		}\``;
	}
}
