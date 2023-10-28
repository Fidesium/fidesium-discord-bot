import express, { Request, Response } from 'express';
import { verifyDiscordRequest } from './utils/verifyDiscordRequest.js';
import {
    InteractionType,
    InteractionResponseType
  } from 'discord-interactions';
import { initializeClient } from './client.js';
import { inviteHandler } from './commandHandlers/invite.js';
import { supportHandler } from './commandHandlers/support.js';
import { verifyHandler } from './commandHandlers/verify.js';
const PORT = process.env.PORT || 4003;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/health', (_: Request, response: Response) => {
	response.sendStatus(204);
});

app.use(express.json({ verify: verifyDiscordRequest(process.env.DISCORD_PUBLIC_KEY) }));

app.post('/interactions', async (req, res) => {
    // Interaction type and data
    const { type, id, data } = req.body
    const { name } = data
    if ((type === InteractionType.PING) || (type === undefined)) {
        return res.send({ type: InteractionResponseType.PONG });
      }
    if (type === InteractionType.APPLICATION_COMMAND) {
        if (name === 'invite') {
            const response = inviteHandler()
            return res.send(response)
        } else if (name === 'support') {
            const response = supportHandler()
            return res.send(response)
        } else if (name === 'verify') {
            const response = verifyHandler()
            return res.send(response)
        } else {
            console.log(name)
        }

    }
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

initializeClient()
