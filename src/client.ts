import { Client, GatewayIntentBits, Events, Interaction, Collection, REST, Routes } from 'discord.js';
import { TOKEN } from './config/token.js'
import { CLIENT_ID } from './config/clientId.js'
import { commandHandler } from './commandHandler.js';
import {ping2Command} from './commands/ping2.js';
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
      //@ts-ignore
      client.commands = new Collection()
      //@ts-ignore
      client.commands.set('ping2', ping2Command)
      //@ts-ignore
      console.log(client.commands)
    //   client.on(Events.InteractionCreate, (interaction: Interaction) => commandHandler(interaction));
      await rest.put(
        //@ts-ignore
        Routes.applicationCommands(CLIENT_ID),
        //@ts-ignore
        { body: [ping2Command.data] },
    );
      client.login(TOKEN);
}

export {initializeClient}