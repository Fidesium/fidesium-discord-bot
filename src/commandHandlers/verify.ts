import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const verifyHandler = (guild_id: number, role_id: string): Readonly<{
  readonly type: InteractionResponseType,
  readonly data: Readonly<{
    readonly content: string,
    readonly flags: number
  }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `You can verify your humanity here: https://fidesium-discord-fe-prod-302875b06ad0.herokuapp.com?guild_id=${guild_id}&role_id=${role_id}`,
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { verifyHandler }