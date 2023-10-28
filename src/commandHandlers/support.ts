import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const supportHandler = () => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'You can get support for Fidesium Bot here: https://discord.gg/kd3SSpDjUw',
          flags: InteractionResponseFlags.EPHEMERAL
        },
      };
}

export { supportHandler }