import { SDJwtInstance } from '@sd-jwt/core';
import type { DisclosureFrame } from '@sd-jwt/types';

// Example of a instantiation of a sd-jwt instance
/*
const { signer} = await createSignerVerifier();

const sdJwt = new SDJwtInstance({
  signer,
  verifier,
  signAlg: ES256.alg,
  hasher: digest,
  hashAlg: 'sha-256',
  saltGenerator: generateSalt,
});
*/

// Claims of a standard FICTIONAL prescription credential
const claims = {
    firstname: 'Daniel',
    lastname: 'Iversen',
    ssn: '25-10-1997',
    condition: 'Insomnia',
    prescriptionId: '1234',
    medicine: 'Melatonin'
};

// Create a disclosure frame, define the disclosure policy, what claims can be hidden
const disclosureFrame: DisclosureFrame<typeof claims> = {
    _sd: ['firstname', 'lastname', 'condition'],
};

// Export the initiating logic for a sd supporting JWT
export { claims, disclosureFrame };