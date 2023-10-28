import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const inviteHandler = () => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'You can invite Fidesium Bot here: https://discord.com/api/oauth2/authorize?client_id=1167508991765651526&permissions=380373118016&scope=applications.commands%20bot',
          flags: InteractionResponseFlags.EPHEMERAL
        },
      };
}

export { inviteHandler }