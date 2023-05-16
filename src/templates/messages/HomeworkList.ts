import { InteractionReplyOptions, MessagePayload } from "discord.js";
import { HomeworkType, HomeworkTypeIcon } from "../../constants/homework";
import { HomeworkService } from "../../services/homework.service";
import { DocketFile } from "../../types/services/FileServiceType";
import { DocketHomework } from "../../types/services/HomeworkServiceType";
import { EmptyMessage } from "../components/EmptyMessage";
import { FileHeader } from "../components/FileHeader";
import { HomeworkCard } from "../components/HomeworkCard";
import { TypeButton } from "../components/TypeButton";
import { Title } from "../components/Title";

export function HomeworkList(
	file: DocketFile,
	homeworks: DocketHomework[],
	type: HomeworkType
): InteractionReplyOptions {
	let filteredHomework = homeworks.filter(
		(homework) => homework.timestamp * 1000 >= Date.now()
	);
	const totalHomeworks = filteredHomework.length;

	if (type !== HomeworkType.ALL) {
		filteredHomework = filteredHomework.filter(
			(homework) => homework.type === type
		);
	}

	const totalTypeHomeworks = filteredHomework.length;

	const homeworkCards = filteredHomework.map((homework) =>
		HomeworkCard(homework)
	);

	if (type !== HomeworkType.ALL) {
		return {
			content: `${Title()}\n\`\`\`📂 File: ${
				file.filename
			} (${totalHomeworks}) >> ${
				HomeworkTypeIcon[type]
			} ${type} (${totalTypeHomeworks})\`\`\`${
				totalTypeHomeworks == 0
					? EmptyMessage()
					: homeworkCards.join("\n")
			}`,
			components: [TypeButton()],
		};
	} else {
		return {
			content: `${Title()}\n${FileHeader(file.filename, totalHomeworks)}${
				totalHomeworks == 0 ? EmptyMessage() : homeworkCards.join("\n")
			}`,
			components: [TypeButton()],
		};
	}
}
