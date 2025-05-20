import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { SDJwtInstance } from '@sd-jwt/core';
import { digest, ES256, generateSalt, buildVerifierFromJwk } from '../utils.js';

export const verifyPrescription = async (req: Request, res: Response) => {
    try { 
        const { credential, jwk } = req.body;

        // Is credential received?
        if (credential) {
            console.log('Credential received:', credential);

            // Is public key received?
            if (jwk) {
                console.log('Jwk received:', jwk);

                const verifier = await buildVerifierFromJwk(jwk);

                const sdjwt = new SDJwtInstance({
                    signer : () => { throw new Error('signer not needed'); },
                    verifier,
                    signAlg : ES256.alg,
                    hasher  : digest,
                    hashAlg : 'sha-256',
                    saltGenerator: generateSalt,
                });

                const validated = await sdjwt.validate(credential);
                console.log('Validated:', validated);
            }
        }

    } catch (e) {
        console.log('Error receiving disclosed credential:', e);
    }
}