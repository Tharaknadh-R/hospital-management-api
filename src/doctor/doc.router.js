import express from 'express';

import {
    getAllDoctors,
    getDoctorByID,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorAppointments
} from "./doc.controller.js";

//importing middleware validation
import { validateDoctor } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get("/",getAllDoctors);

router.get("/:id/appointments",getDoctorAppointments);

router.get("/:id", getDoctorByID);

router.get("/", (req,res) => {
    res.send("Doctors Route Working");
});

//routing validation
router.post("/",validateDoctor,createDoctor);

router.put("/:id", updateDoctor);

router.delete("/:id",deleteDoctor);

export default router;
