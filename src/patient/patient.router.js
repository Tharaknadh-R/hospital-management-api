import express from "express";

import {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientHistory
} from "./patient.controller.js";
//importing patient validation
import { validatePatient } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", getAllPatients);

router.get("/:id/history", getPatientHistory);

router.get("/:id",getPatientById);

//routing validation
router.post("/",validatePatient,createPatient);

router.put("/:id",updatePatient);

router.delete("/:id",deletePatient);


export default router;