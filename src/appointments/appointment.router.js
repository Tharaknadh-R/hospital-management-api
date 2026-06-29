import express from "express";
import {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
} from "./appointment.controller.js";

//importing Appointment validation
import { validateAppointment } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/",getAllAppointments);

router.get("/:id",getAppointmentById);

//routing validation
router.post("/",validateAppointment,createAppointment);

router.put("/:id", validateAppointment, updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;