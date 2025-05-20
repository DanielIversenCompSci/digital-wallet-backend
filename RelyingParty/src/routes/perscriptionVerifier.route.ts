import { Router } from 'express';
import { verifyPrescription } from '../controllers/prescriptionVerifier.controller.js';

const router = Router();

router.post('/relyingparty/verify', verifyPrescription);

export const prescriptionVerifierRoutes = router;