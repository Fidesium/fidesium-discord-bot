

import { Interaction, SlashCommandBuilder } from "discord.js";


const verifyCommand = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify your humanity with Fidesium'),
    async execute(_: Interaction): Promise<void> {},
};

export {verifyCommand}