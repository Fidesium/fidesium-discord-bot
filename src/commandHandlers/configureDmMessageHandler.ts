import { InteractionResponseFlags, InteractionResponseType, MessageComponent, MessageComponentTypes } from "discord-interactions";

const configureDmMessageHandler = (): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly title: string,
        readonly custom_id: string,
        components: ReadonlyArray<Readonly<{
            type: number,
            components: ReadonlyArray<{
                custom_id: string,
                type: number,
                style: number,
                label: string,
                required: boolean
            }>
        }>>,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.MODAL,
        data: {
            title: 'Enter Welcome Message',
            custom_id: 'welcome_dm_modal',
            components: [{
                type: MessageComponentTypes.ACTION_ROW,
                components:[{
                    type: MessageComponentTypes.INPUT_TEXT,
                    custom_id: 'dm_message_selector',
                    style: 1,
                    label: 'Welcome Message',
                    required: true
                }]
            }],
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureDmMessageHandler }