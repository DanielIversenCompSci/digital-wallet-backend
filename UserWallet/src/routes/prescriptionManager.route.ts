import { Router } from "express";
import { holdPrescription } from "../controllers/prescriptionManager.controller.js";

const router = Router();

router.post('/userwallet/hold', holdPrescription);

export const prescriptionManagerRoutes = router;