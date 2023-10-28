

import { Interaction, SlashCommandBuilder } from "discord.js";


const inviteCommand = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Get a link to invite me to your server'),
	async execute(_: Interaction) {},
};

export {inviteCommand}