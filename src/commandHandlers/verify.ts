import { ButtonStyleTypes, InteractionResponseFlags, InteractionResponseType, MessageComponentTypes } from "discord-interactions";

const verifyHandler = () => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'You can verify your humanity here: https://robotornot.rarimo.com',
            flags: InteractionResponseFlags.EPHEMERAL
        },
    };
}

export { verifyHandler }