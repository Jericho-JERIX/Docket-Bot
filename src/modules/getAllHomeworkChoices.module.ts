import { HomeworkType } from "../constants/homework";
import { HomeworkService } from "../services/homework.service";
import { ClearedHomeworkCard } from "../templates/components/ClearedHomeworkCard";
import { SlashCommandOptionChoice } from "../types/SlashCommandOption";
import {
	DocketHomework,
	HomeworkServiceGetAllResponse,
} from "../types/services/HomeworkServiceType";

export async function getAllHomeworkChoices(
	channelId: string,
	filterFunction: (homework: DocketHomework) => boolean
): Promise<SlashCommandOptionChoice[]> {
	const response = await HomeworkService.getAll(channelId, HomeworkType.ALL);

	if (response.status === 400) {
		return [];
	}

	const homeworkServiceResponse: HomeworkServiceGetAllResponse =
		response.data;
	const choices = homeworkServiceResponse.homeworks
		.filter((homework: DocketHomework) => filterFunction(homework))
		.map((homework) => ({
			name: ClearedHomeworkCard(homework),
			value: String(homework.homework_id),
		}));

	return choices;
}
