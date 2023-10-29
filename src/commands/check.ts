

import { Interaction, SlashCommandBuilder } from "discord.js";


const checkCommand = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check an ETH Mainnet asset'),
    async execute(_: Interaction): Promise<void> {},
};

export {checkCommand}