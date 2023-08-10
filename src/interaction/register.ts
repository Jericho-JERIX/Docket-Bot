import { REST, Routes } from "discord.js";
import { Ping } from "./commands/ping";
import { SlashCommand } from "../types/SlashCommand";
import * as dotenv from "dotenv";
import { SlashCommandObject } from "../types/SlashCommandObject";
import { Open } from "./commands/channel/open";
import { List } from "./commands/homework/list";
import { Add } from "./commands/homework/add";
import { Edit } from "./commands/homework/edit";
import { Delete } from "./commands/homework/delete";
import { EditChannel } from "./commands/channel/editChannel";
import { CreateFile } from "./commands/file/createFile";
import { EditFile } from "./commands/file/editFile";
import { DeleteFile } from "./commands/file/deleteFile";
import { Check } from "./commands/homework/check";
import { Uncheck } from "./commands/homework/uncheck";
import { Test } from "./commands/test";

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID }: any = process.env;

const rest = new REST({
	version: "10",
}).setToken(TOKEN);

export async function registerCommands(): Promise<SlashCommandObject> {
	const commands = [
		Ping,
		Test,
		Open,
		List,
		Add,
		Edit,
		Delete,
		EditChannel,
		CreateFile,
		EditFile,
		DeleteFile,
		Check,
		Uncheck,
	];

	let commandsObject: SlashCommandObject = {};

	for (const command of commands) {
		commandsObject[command.name] = command;
	}

	try {
		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands,
		});
		console.log(`✅ Successfully registered commands`);
		return commandsObject;
	} catch (error) {
		console.error(error);
		return {};
	}
}
