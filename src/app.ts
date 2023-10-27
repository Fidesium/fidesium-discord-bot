import express, { Request, Response } from 'express';
import { verifyDiscordRequest } from './utils/verifyDiscordRequest.js';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
  } from 'discord-interactions';
import { initializeClient } from './client.js';
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
    if ((type === InteractionType.PING) || (type === undefined)) {
        return res.send({ type: InteractionResponseType.PONG });
      }
    if (type === InteractionType.APPLICATION_COMMAND) {
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              // Fetches a random emoji to send from a helper function
              content: 'hello world ' + '📸',
            },
          });
    }
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

initializeClient()
