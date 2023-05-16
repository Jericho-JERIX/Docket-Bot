import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { registerCommands } from "./src/interaction/register";
import { Interaction } from "discord.js";
import { BaseInteraction } from "discord.js";
import { CommandInteraction } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandObject } from "./src/types/SlashCommandObject";

dotenv.config();
let commands: SlashCommandObject;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

client.once(Events.ClientReady, async (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	commands = await registerCommands();
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (interaction.isChatInputCommand()) {
		commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
		commands[
			String(interaction.message.interaction?.commandName)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		commands[
			String(interaction.message.interaction?.commandName)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

client.login(process.env.TOKEN);
