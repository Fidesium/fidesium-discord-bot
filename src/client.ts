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
import { isAddress } from 'web3-validator';
import * as Sentry from "@sentry/node";
import ky from 'ky';
import { checkCommand } from './commands/check.js';
const initializeClient = async (): Promise<void> => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    //@ts-ignore
    const rest = new REST().setToken(TOKEN);
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
   
    client.on('guildMemberAdd', async (member) => {
        try{
            const welcomeMessageResponse = await ky.get(`${process.env.FIDESIUM_URL}/api/v0/discord/${member.guild.id}/dm_message`)
            const welcomeMessageJson: Readonly<{readonly dm_message: string}> = await welcomeMessageResponse.json()
            //@ts-ignore
            member.guild.channels.get('channelID').send(welcomeMessageJson.dm_message); 
        } catch (e) {
            Sentry.captureException(e)
        }
    });



    client.on('message', async (message): Promise<any> => {
        try {
        // const contentList = message.content.split(' ')
            if (isAddress(message.content)) {
                const responseData = await ky.post(`${process.env.FIDESIUM_URL}/api/v0/0x1/contract`, {json: {contract: message.content}})
                const responseJson: any = await responseData.json()
                const riskScore = responseJson.risks.risks.totalRisk
                const PoHVerified = responseJson.creatorPoH
                const PoHString = PoHVerified ? 'has' : 'has not'
                const contract = responseJson.contract
                return message.reply(`This asset has been risked by Fidesium. The total risk is ${riskScore}. The deployer ${PoHString} been verified by Rarimo. For a full risk breakdown, please visit: https://app.fidesium.xyz/token/${contract}`)
            } else {
                return null
            }
        // const matchedPromises = await Promise.allSettled(contentList.map((content: string) => {
        //   if (isAddress(content)) {
        //     return ky.post(`${process.env.FIDESIUM_URL}/api/v0/0x1/contract`, {json: {contract: content}})
        //   } else {
        //     null
        //   }
        // }))
        } catch (e) {
            Sentry.captureException(e)
        }
    })

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
            helpCommand.data,
            checkCommand.data
        ] },
    );
    client.login(TOKEN);
}

export {initializeClient}