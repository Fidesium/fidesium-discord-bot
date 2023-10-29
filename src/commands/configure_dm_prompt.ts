

import { Interaction, SlashCommandBuilder } from "discord.js";


const configureDmPromptCommand = {
    data: new SlashCommandBuilder()
        .setName('configure_dm_prompt')
        .setDescription('Configure dm_prompt'),
    async execute(_: Interaction): Promise<void> {},
};

export {configureDmPromptCommand}