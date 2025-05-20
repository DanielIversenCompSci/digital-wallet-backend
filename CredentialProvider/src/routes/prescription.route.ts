import { Router } from "express";
import { requestPrescription } from "../controllers/prescription.controller.js";

const router = Router();

router.post('/credentialprovider/issue', requestPrescription);

export const prescriptionRoutes = router;