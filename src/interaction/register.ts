import { REST, Routes } from "discord.js";
import { Ping } from "./commands/ping";
import { SlashCommand } from "../types/SlashCommand";
import * as dotenv from "dotenv";
import { SlashCommandObject } from "../types/SlashCommandObject";
import { Open } from "./commands/open";
import { List } from "./commands/list";
import { Add } from "./commands/add";
import { Edit } from "./commands/edit";
import { Delete } from "./commands/delete";
import { EditChannel } from "./commands/editChannel";
import { CreateFile } from "./commands/createFile";

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID }: any = process.env;

const rest = new REST({
	version: "10",
}).setToken(TOKEN);

export async function registerCommands(): Promise<SlashCommandObject> {
	const commands = [Open, List, Add, Edit, Delete, EditChannel, CreateFile];

	let commandsObject: SlashCommandObject = {};

	for (const command of commands) {
		commandsObject[command.name] = command;
	}

	try {
		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands,
		});
		console.log(
			`✅ Successfully registered commands.\n- ${commands
				.map((command) => command.name)
				.join("\n- ")}`
		);
		return commandsObject;
	} catch (error) {
		console.error(error);
		return {};
	}
}
