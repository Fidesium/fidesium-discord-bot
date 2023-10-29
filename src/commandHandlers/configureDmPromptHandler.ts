import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const configureDmPromptHandler = (status: boolean): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: (status === true) ? 'You have configured Fidesium bot to send a welcome DM.' : 'You have configured Fidesium bot not to send a welcome DM.',
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureDmPromptHandler }