import { HomeworkType } from "../constants/homework";
import { HomeworkService } from "../services/homework.service";
import { ClearedHomeworkCard } from "../templates/components/ClearedHomeworkCard";
import { SlashCommandOptionChoice } from "../types/SlashCommandOption";
import { HomeworkServiceGetAllResponse } from "../types/services/HomeworkServiceType";

export async function getAllHomeworkChoices(
	channelId: string,
	search: string
): Promise<SlashCommandOptionChoice[]> {
	const response = await HomeworkService.getAll(channelId, HomeworkType.ALL);

	if (response.status === 400) {
		return [];
	}

	const homeworkServiceResponse: HomeworkServiceGetAllResponse =
		response.data;
	const choices = homeworkServiceResponse.homeworks
		.filter((homework) => homework.label.includes(search))
		.map((homework) => ({
			name: ClearedHomeworkCard(homework),
			value: String(homework.homework_id),
		}));

	return choices;
}
