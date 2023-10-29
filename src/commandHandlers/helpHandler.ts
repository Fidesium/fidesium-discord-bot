import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const helpHandler = (): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'Possible admin commands: /configure_dm_message. /configure_dm_prompt. /configure_role; Possible commands: /verify, /support, /invite, /help, /check',
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { helpHandler }