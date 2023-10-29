import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

const configureDmMessageModalSubmission = (riskScore: number, PoHString: string, contract: string): Readonly<{
    readonly type: InteractionResponseType,
    readonly data: Readonly<{
        readonly content: string,
        readonly flags: number
    }>
}> => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `This asset has been risked by Fidesium. The total risk is ${riskScore}. The deployer ${PoHString} been verified by Rarimo. For a full risk breakdown, please visit: https://fidesium-token-lookup-prod.herokuapp.com/token/${contract}`,
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { configureDmMessageModalSubmission }