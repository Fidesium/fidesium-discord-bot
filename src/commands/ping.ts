import { REST, Routes } from 'discord.js';
import { TOKEN } from '../config/token.js'
import { CLIENT_ID } from '../config/clientId.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

try {
  if((TOKEN !== undefined) && (CLIENT_ID !== undefined)) {
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } else {
    throw new Error('token or client id are undefined')
  }

} catch (error) {
  console.error(error);
}