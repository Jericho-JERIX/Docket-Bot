import { ApplicationCommandOptionType } from "discord.js";

export type SlashCommandOptionChoice = {
	name: string;
	value: string;
};

export type SlashCommandOption = {
	name: string;
	description?: string;
	type: ApplicationCommandOptionType;
	required?: boolean;
	autocomplete?: boolean;
	choices?: SlashCommandOptionChoice[];
};
