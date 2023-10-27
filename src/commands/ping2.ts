

import { Interaction, SlashCommandBuilder } from "discord.js";


const ping2Command = {
	data: new SlashCommandBuilder()
		.setName('ping2')
		.setDescription('Replies with Pong!'),
	async execute(_: Interaction) {
    //@ts-ignore
		// await interaction.reply('Pong!');
	},
};

export {ping2Command}