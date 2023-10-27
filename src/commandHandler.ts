import { Interaction } from "discord.js";

const commandHandler = async (interaction: Interaction): Promise<void> => {
    console.log(interaction)
    console.log('fuckbaskets')
    //@ts-ignore
    const command = interaction.client.commands.get(interaction.commandName);
    try {
		await command.execute(interaction);
	} catch (error) {
        console.log('error in interaction handler', error)
    }
}

export {commandHandler}