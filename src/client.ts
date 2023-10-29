import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { TOKEN } from './config/token.js'
import { CLIENT_ID } from './config/clientId.js'
import {inviteCommand} from './commands/invite.js'
import { supportCommand } from './commands/support.js';
import { verifyCommand } from './commands/verify.js';
import { configureRoleCommand } from './commands/configure_role.js';
import { configureDmMessageCommand } from './commands/configure_dm_message.js';
import { configureDmPromptCommand } from './commands/configure_dm_prompt.js';
import { helpCommand } from './commands/help.js';
const initializeClient = async (): Promise<void> => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    //@ts-ignore
    const rest = new REST().setToken(TOKEN);
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
      
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
    });

    // client.on('message', (message) => {
    //   if (message.content.startsWith('/') && message.author.bot) {
    //     return;
    //   }
    // })

    await rest.put(
        //@ts-ignore
        Routes.applicationCommands(CLIENT_ID),
        { body: [
          inviteCommand.data,
          supportCommand.data,
          verifyCommand.data,
          configureRoleCommand.data,
          configureDmMessageCommand.data,
          configureDmPromptCommand.data,
          helpCommand.data
        ] },
    );
    client.login(TOKEN);
}

export {initializeClient}