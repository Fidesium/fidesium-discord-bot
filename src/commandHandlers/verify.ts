import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const verifyHandler = (): Readonly<{
  readonly type: InteractionResponseType,
  readonly data: Readonly<{
    readonly content: string,
    readonly flags: number
  }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'You can verify your humanity here: https://robotornot.rarimo.com',
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { verifyHandler }