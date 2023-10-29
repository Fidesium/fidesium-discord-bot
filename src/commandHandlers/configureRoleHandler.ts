import { InteractionResponseFlags, InteractionResponseType, MessageComponentTypes } from "discord-interactions";

const configureRoleHandler = (): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly components: ReadonlyArray<Readonly<{
            readonly type: number,
            readonly components: ReadonlyArray<{
                readonly custom_id: string,
                readonly type: number
            }>
        }>>,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'Please select the role to assign to provable humans',
            components: [{
                type: MessageComponentTypes.ACTION_ROW,
                components:[{
                    type: MessageComponentTypes.ROLE_SELECT,
                    custom_id: 'role_selector'
                }]
            }],
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureRoleHandler }