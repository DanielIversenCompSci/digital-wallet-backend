// ***********************************************************************
// TO TEST:
/* 
curl -X POST http://localhost:3001/credentialprovider/issue \
-H "Content-Type: application/json" \
-d '{}'
*/
// ***********************************************************************
import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { SDJwtInstance } from '@sd-jwt/core';
import { createIssuerContext, digest, ES256, generateSalt } from '../utils.js';
import { claims, disclosureFrame } from '../sd-claims.js';

export const requestPrescription = async (req: Request, res: Response) => {
        const { signer, verifier, publicJwk } = await createIssuerContext();
        const sdJwt = new SDJwtInstance({
            signer,
            verifier,
            signAlg: ES256.alg,
            hasher: digest,
            hashAlg: 'sha-256',
            saltGenerator: generateSalt,
        });

        const credential = await sdJwt.issue(claims, disclosureFrame);

        // Show for prototype purposes
        console.log('Issued credential:', credential);
        console.log('\n');
        console.log('Issued PublicJwk:', publicJwk);

        // ISSUE CRED: Forward the crendtial to the UserWallet(holder), it will be handed over to a post endpoint owned by the UserWallet service
        try {
            const forwardingPort = 3002;

            // TODO: Create this endpoint in the UserWallet service
            const forwardingUrl = `http://localhost:${forwardingPort}/userwallet/hold`;

            await fetch(forwardingUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credential,
                    jwk: publicJwk,
                }),
            });
        } catch (e) {
            console.error('Error forwarding credential:', e);
        }

        res.status(200).json({ credential });
}