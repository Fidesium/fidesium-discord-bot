import { InteractionResponseFlags, InteractionResponseType, MessageComponentTypes } from "discord-interactions";

const checkHandler = (): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly title: string,
        readonly custom_id: string,
        readonly components: ReadonlyArray<Readonly<{
            readonly type: number,
            readonly components: ReadonlyArray<{
                readonly custom_id: string,
                readonly type: number,
                readonly style: number,
                readonly label: string,
                readonly required: boolean
            }>
        }>>,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.MODAL,
        data: {
            title: 'Enter Welcome Message',
            custom_id: 'check_contract_modal',
            components: [{
                type: MessageComponentTypes.ACTION_ROW,
                components:[{
                    type: MessageComponentTypes.INPUT_TEXT,
                    custom_id: 'check_contract_selector',
                    style: 1,
                    label: 'Contract Address',
                    required: true
                }]
            }],
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { checkHandler }