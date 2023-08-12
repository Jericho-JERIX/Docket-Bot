import { HomeworkType } from "../constants/homework";
import { HomeworkService } from "../services/homework.service";
import { HomeworkList } from "../templates/messages/HomeworkList";
import { SlashCommandInteractionMessage } from "../types/SlashCommandInteractionMessage";
import { HomeworkServiceGetAllResponse } from "../types/services/HomeworkServiceType";
import { ErrorMesssageEmbed } from "../templates/components/ErrorMessageEmbed";
import { Text } from "../constants/text";
import { ColorPalette } from "../constants/colorPalette";
import { NotOpenCollectionError } from "./../templates/messages/errors/NotOpenCollectionError";

export async function listHomeworksByChannelId(
	channelId: string,
	type: HomeworkType,
	keyword: string
): Promise<SlashCommandInteractionMessage> {
	const response = await HomeworkService.getAll(channelId, type, keyword);

	if (response.status === 400) {
		return NotOpenCollectionError();
	}

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
