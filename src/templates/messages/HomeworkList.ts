import {
	InteractionReplyOptions,
	InteractionUpdateOptions,
	MessagePayload,
} from "discord.js";
import { HomeworkType, HomeworkTypeIcon } from "../../constants/homework";
import { HomeworkService } from "../../services/homework.service";
import { DocketFile } from "../../types/services/FileServiceType";
import { DocketHomework } from "../../types/services/HomeworkServiceType";
import { EmptyMessage } from "../components/EmptyMessage";
import { FileHeader } from "../components/FileHeader";
import { HomeworkCard } from "../components/HomeworkCard";
import { TypeButton } from "../components/TypeButton";
import { Title } from "../components/Title";
import { SlashCommandInteractionMessage } from "../../types/SlashCommandInteractionMessage";
import { NoDeadlineHomeworkCard } from "../components/NoDeadlineHomeworkCard";

export function HomeworkList(
	file: DocketFile,
	homeworks: DocketHomework[],
	totalCount: number,
	typeCount: number,
	type: HomeworkType
): SlashCommandInteractionMessage {
	let filteredHomework = homeworks.filter(
		(homework) => homework.timestamp * 1000 >= Date.now()
	);

	if (type !== HomeworkType.ALL) {
		filteredHomework = filteredHomework.filter(
			(homework) => homework.type === type
		);
	}

	const homeworkCards = filteredHomework.map((homework) =>
		homework.no_deadline
			? NoDeadlineHomeworkCard(homework)
			: HomeworkCard(homework)
	);

	if (type !== HomeworkType.ALL) {
		return {
			content: `\`\`\`📂 Collection: ${
				file.filename
			} (${totalCount}) >> ${
				HomeworkTypeIcon[type]
			} ${type} (${typeCount})\`\`\`${
				typeCount == 0 ? EmptyMessage() : homeworkCards.join("\n")
			}`,
			components: [TypeButton()],
		};
	} else {
		return {
			content: `${FileHeader(file.filename, totalCount)}${
				totalCount == 0 ? EmptyMessage() : homeworkCards.join("\n")
			}`,
			components: [TypeButton()],
		};
	}
}
