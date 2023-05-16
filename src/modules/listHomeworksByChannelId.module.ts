import { HomeworkType } from "../constants/homework";
import { HomeworkService } from "../services/homework.service";
import { HomeworkList } from "../templates/messages/HomeworkList";
import { SlashCommandInteractionMessage } from "../types/SlashCommandInteractionMessage";
import { HomeworkServiceGetAllResponse } from "../types/services/HomeworkServiceType";

export async function listHomeworksByChannelId(
	channelId: string,
	type: HomeworkType
): Promise<SlashCommandInteractionMessage> {
	const response = await HomeworkService.getAll(channelId, type);

	const homeworkResponse: HomeworkServiceGetAllResponse = response.data;

	const message = HomeworkList(
		homeworkResponse.file,
		homeworkResponse.homeworks,
		homeworkResponse.total_homework_count,
		homeworkResponse.type_homework_count,
		type
	);

	return message;
}
