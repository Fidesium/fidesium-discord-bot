import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const configureDmMessageModalSubmission = (message: string): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `You have configured the dm message. It is now: ${message}`,
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureDmMessageModalSubmission }