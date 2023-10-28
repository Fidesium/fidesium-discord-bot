

import { Interaction, SlashCommandBuilder } from "discord.js";


const supportCommand = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Get a link to Fidesium Bot\'s support server'),
    async execute(_: Interaction): Promise<void> {},
};

export {supportCommand}