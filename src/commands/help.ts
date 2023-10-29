

import { Interaction, SlashCommandBuilder } from "discord.js";


const helpCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help for Fidesium Bot'),
    async execute(_: Interaction): Promise<void> {},
};

export {helpCommand}