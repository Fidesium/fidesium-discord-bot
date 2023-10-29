import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const checkContractModalSubmitDeferrer = (contract: string): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Inline rsk analytics coming soom. For a full risk breakdown, please visit: https://fidesium-token-lookup-prod.herokuapp.com/token/${contract}`,
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { checkContractModalSubmitDeferrer }

