import { verifyKey } from 'discord-interactions';
import { Request, Response } from 'express';

const verifyDiscordRequest = (clientKey: Uint8Array | ArrayBuffer | Buffer | string) => {
    return function (req: Request, res: Response, buf: Uint8Array | ArrayBuffer | Buffer | string) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');
  
      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }

export { verifyDiscordRequest }