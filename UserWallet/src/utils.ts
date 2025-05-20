// ************************************************************
// Helper methods from the sd-jwt library
// ************************************************************

import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
export { digest, generateSalt, ES256 };


export const createSignerVerifier = async () => {
  const { privateKey, publicKey } = await ES256.generateKeyPair();
  return {
    signer: await ES256.getSigner(privateKey),
    verifier: await ES256.getVerifier(publicKey),
    publicKey
  };
};

// ************************************************************
// Holder/verifier side:
// ************************************************************
export const buildVerifierFromJwk = async (jwk: JsonWebKey) =>
  ES256.getVerifier(jwk);

