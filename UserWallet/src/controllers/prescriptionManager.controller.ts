import { Request, Response } from 'express';

import { SDJwtInstance } from '@sd-jwt/core';
import { digest, ES256, generateSalt, buildVerifierFromJwk } from '../utils.js';

export const holdPrescription = async (req: Request, res: Response) => {
    try {
        const { credential, jwk } = req.body;
        
        // Is credential received?
        if (credential) {
            console.log('Credential received:', credential);
            console.log('\n');

            // Is public key received?
            if (jwk) {
                console.log('Jwk received:', jwk);
                console.log('\n');

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
                console.log('Validated Credential:', validated);

                // Creating a Verifiable Presentation:
                // If attemtping to hide claims outside of the disclosure frame, they will be forcefully disclosed
                const presentationFrame = { firstname: true, lastname: true, cprnr: true, adress: true,  medicine: true, medicalcenter: true, doctor: true };
                const presentation = await sdjwt.present<typeof credential.claims>(
                    credential,
                    presentationFrame,
                );

                const data = presentation.toString();
                const decodedObject = await sdjwt.decode(data);
                console.log('\n');
                console.log("SD-JWT-VP being transmitted:", decodedObject);

                // If the credential matched the signature, forward it to the Relying Party service
                if (validated) {
                    console.log('Credential is valid, forwarding to Relying Party service...');
                    
                    try {
                        // #TODO: Create this endpoint in the Relying Party service and add forwarding logic here
                        const forwardingPort = 3003;
                        const forwardingUrl = `http://localhost:${forwardingPort}/relyingparty/verify`;

                        await fetch(forwardingUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                credential: presentation,
                                jwk: jwk
                            }),
                        });
                    } catch (e) {
                        console.error('Error forwarding credential to Relying Party service:', e);
                    }
                }
            }

        } else {
            console.log('Payload is empty');
        }

    } catch (e) {
        console.log('Error receiving credential:', e);
    };
}
