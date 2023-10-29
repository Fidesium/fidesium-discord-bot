import express, { NextFunction, Request, Response } from 'express';
import { verifyDiscordRequest } from './utils/verifyDiscordRequest.js';
import {
    InteractionType,
    InteractionResponseType
} from 'discord-interactions';
import { initializeClient } from './client.js';
import { inviteHandler } from './commandHandlers/invite.js';
import { supportHandler } from './commandHandlers/support.js';
import { verifyHandler } from './commandHandlers/verify.js';
import ky from 'ky'
const PORT = process.env.PORT || 4003;
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { configureDmPromptHandler } from './commandHandlers/configureDmPromptHandler.js';
import { calculate } from 'discord-permission'
import { configureRoleHandler } from './commandHandlers/configureRoleHandler.js';
import { configureRoleComponentHandler } from './commandHandlers/configureRoleComponentHandler.js';
import { configureDmMessageHandler } from './commandHandlers/configureDmMessageHandler.js';
import { configureDmMessageModalSubmission } from './commandHandlers/configureDmMessageModalSubmission.js';
import { helpHandler } from './commandHandlers/helpHandler.js';
import { isAddress } from 'web3-validator';
import { checkHandler } from './commandHandlers/checkHandler.js';
import { checkContractModalSubmitHandler } from './commandHandlers/checkContractModalSubmitHandler.js';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 0.01,
    })
}

const app = express();

if(process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: "https://30ec27704bcfde07e8023456625fba93@o4504884732690432.ingest.sentry.io/4506130030329856",
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            new Sentry.Integrations.Express({ app }),
            new ProfilingIntegration()
            // enable Express.js middleware tracing
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
} else {
    console.log('not prod so no sentry')
}

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(express.urlencoded({ extended: true }));

app.use('/health', (_: Request, response: Response) => {
    response.sendStatus(204);
});

app.use(express.json({ verify: verifyDiscordRequest(process.env.DISCORD_PUBLIC_KEY) }));

app.post('/interactions', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { type, data, guild_id } = req.body
        const name = data && data.name
        if ((type === InteractionType.PING) || (type === undefined)) {
            return res.send({ type: InteractionResponseType.PONG });
        }
        const memberPermission = req.body.member.permissions
        const hasManageRoles = calculate('MANAGE_ROLES', memberPermission)
        if (type === InteractionType.MODAL_SUBMIT) {
            if(req.body?.data?.components[0]?.components[0]?.custom_id === 'check_contract_selector') {
                if (isAddress(req.body?.data?.components[0]?.components[0]?.value)) {
                    const responseData = await ky.post(`${process.env.FIDESIUM_URL}/api/v0/0x1/contract`, {json: {contract: req.body?.data?.components[0]?.components[0]?.value}})
                    const responseJson: any = await responseData.json()
                    const riskScore = responseJson.risks.risks.totalRisk
                    const PoHVerified = responseJson.creatorPoH
                    const PoHString = PoHVerified ? 'has' : 'has not'
                    const contract = responseJson.contract
                    const response = checkContractModalSubmitHandler(riskScore, PoHString, contract)
                    return res.send(response)
                } else {
                    return res.send(400)
                }
            } else if(req.body?.data?.components[0]?.components[0]?.custom_id === 'dm_message_selector') {
                if (!hasManageRoles) {
                    res.send(400)
                } else {
                    const savedMessageResponse = await ky.post(`${process.env.FIDESIUM_URL}/api/v0/discord/dm_message`, {json: {guild_id, dm_message: req.body?.data?.components[0]?.components[0]?.value}})
                    const savedMessageJson: Readonly<{readonly dmMessage: string}> = await savedMessageResponse.json()
                    const response = configureDmMessageModalSubmission(savedMessageJson.dmMessage)
                    return res.send(response)
                }
            }
        } else if (type === InteractionType.MESSAGE_COMPONENT) {
            if(req.body.message.interaction.name === 'configure_role') {
                if (!hasManageRoles) {
                    res.send(400)
                } else {
                    await ky.post(`${process.env.FIDESIUM_URL}/api/v0/discord/role`, {json: {guild_id, role: req.body.message.interaction.id}})
                    const response = configureRoleComponentHandler()
                    return res.send(response)
                }
            }
        } else if (type === InteractionType.APPLICATION_COMMAND) {
            if (name === 'invite') {
                const response = inviteHandler()
                return res.send(response)
            } else if (name === 'support') {
                const response = supportHandler()
                return res.send(response)
            } else if (name === 'verify') {
                const roleIdResponse = await ky.get(`${process.env.FIDESIUM_URL}/api/v0/discord/${guild_id}/role`)
                const roleIdJson: Readonly<{readonly roleId: string}> = await roleIdResponse.json()
                const roleId = roleIdJson.roleId
                if((roleId !== undefined) && (roleId !== null)) {
                    const response = verifyHandler(guild_id, roleId)
                    return res.send(response)
                } else {
                    return res.send(400)
                }
            } else if (name === 'configure_role') {
                if (!hasManageRoles) {
                    res.send(400)
                } else {
                    const response = configureRoleHandler()
                    return res.send(response)
                }
            } else if (name === 'configure_dm_prompt') {
                if (!hasManageRoles) {
                    res.send(400)
                } else {
                    const dmStatus = await ky.post(`${process.env.FIDESIUM_URL}/api/v0/discord/dm_prompt`, {json: {guild_id}})
                    const dmStatusJson: Readonly<{readonly dmStatus: boolean}> = await dmStatus.json()
                    const response = configureDmPromptHandler(dmStatusJson.dmStatus)
                    return res.send(response)
                }
            } else if (name === 'configure_dm_message') {
                if (!hasManageRoles) {
                    res.send(400)
                } else {
                    const response = configureDmMessageHandler()
                    return res.send(response)
                }
            } else if (name === 'help') {
                const response = helpHandler()
                return res.send(response)
            } else if (name === 'check') {
                const response = checkHandler()
                return res.send(response)
            } else {
                console.log(name)
            }
        }
        return res.send(400)
    } catch (e) {
        return next(e)
    }

})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    console.log(err)
    res.status(500).send()
});

initializeClient()

