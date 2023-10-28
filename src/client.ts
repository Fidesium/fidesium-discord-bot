import { Client, GatewayIntentBits, Events, Interaction, Collection, REST, Routes } from 'discord.js';
import { TOKEN } from './config/token.js'
import { CLIENT_ID } from './config/clientId.js'
import {inviteCommand} from './commands/invite.js'
import { supportCommand } from './commands/support.js';
import { verifyCommand } from './commands/verify.js';
const initializeClient = async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    //@ts-ignore
    const rest = new REST().setToken(TOKEN);
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
      
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
      
        if (interaction.commandName === 'ping2') {
            await interaction.reply('Pong!');
        }
    });
    await rest.put(
        //@ts-ignore
        Routes.applicationCommands(CLIENT_ID),
        { body: [inviteCommand.data, supportCommand.data, verifyCommand.data] },
    );
    client.login(TOKEN);
}

export {initializeClient}