

import { Interaction, SlashCommandBuilder } from "discord.js";


const configureDmMessageCommand = {
    data: new SlashCommandBuilder()
        .setName('configure_dm_message')
        .setDescription('Configure dm_message'),
    async execute(_: Interaction): Promise<void> {},
};

export {configureDmMessageCommand}