// ************************************************************
// Helper methods from the sd-jwt library
// ************************************************************

import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { v4 as uuid } from 'uuid';

export { digest, generateSalt, ES256 };


export const createSignerVerifier = async () => {
  const { privateKey, publicKey } = await ES256.generateKeyPair();
  return {
    signer: await ES256.getSigner(privateKey),
    verifier: await ES256.getVerifier(publicKey),
  };
};

// ************************************************************
// Issuer side:
// ************************************************************
export const createIssuerContext = async () => {
  const { privateKey: privJwk, publicKey: pubJwk } = await ES256.generateKeyPair();

  // add a stable key-id so verifiers can match it later if you ever rotate keys
  (pubJwk as Record<string, unknown>).kid = uuid();

  const signer   = await ES256.getSigner(privJwk);
  const verifier = await ES256.getVerifier(pubJwk);   // ← works: getVerifier expects JWK

  return { signer, verifier, publicJwk: pubJwk };
};