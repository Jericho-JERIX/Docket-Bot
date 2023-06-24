import { ShorthenDayName } from "../../constants/dayName";
import { fixSpace } from "../../modules/fixSpace.module";
import { populateDocketHomework } from "../../modules/populateDocketHomework.module";
import { PopulatedDocketHomework } from "../../types/PopulatedDocketHomework";
import { DocketHomework } from "../../types/services/HomeworkServiceType";

export function NoDeadlineHomeworkCard(homework: DocketHomework): string {
	const hw: PopulatedDocketHomework = populateDocketHomework(homework);
	let markdownText: string;

	if (!hw.is_checked) {
		markdownText = `${hw.type_icon} \`${hw.label}\``;
	} else {
		markdownText = `~~\`${hw.type_icon} ${hw.label}\`~~`;
	}

	return markdownText;
}
