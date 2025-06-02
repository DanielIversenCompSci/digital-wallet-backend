import { SDJwtInstance } from '@sd-jwt/core';
import type { DisclosureFrame } from '@sd-jwt/types';

// Claims to be issued in the credential
const claims = {
    firstname: 'Daniel',
    lastname: 'Iversen',
    cprnr: '25-10-1997-1234',
    address: 'Trekroner Centervej 56',
    medicalcenter: 'Trekroner Medical Center',
    doctor: 'Dr. John Olsen',
    condition: 'Insomnia',
    medicine: 'Melatonin'
};

// Create a disclosure frame, define the disclosure policy, what claims can be hidden
const disclosureFrame: DisclosureFrame<typeof claims> = {
    _sd: ['medicalcenter', 'doctor', 'condition'],
};

// Export the initiating logic for a sd supporting JWT
export { claims, disclosureFrame };