import { Client, GatewayIntentBits } from 'discord.js';
import { TOKEN } from './config/token.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping2') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);