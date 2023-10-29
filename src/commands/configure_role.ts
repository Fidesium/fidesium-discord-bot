

import { Interaction, SlashCommandBuilder } from "discord.js";


const configureRoleCommand = {
    data: new SlashCommandBuilder()
        .setName('configure_role')
        .setDescription('Configure role'),
    async execute(_: Interaction): Promise<void> {},
};

export {configureRoleCommand}