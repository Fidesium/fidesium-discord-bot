import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const configureRoleComponentHandler = (): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'You have configured the role.',
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureRoleComponentHandler }