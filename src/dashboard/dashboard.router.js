import express from "express";

import {
    getDashboardSummary,
    getAppointmentStatusSummary,
    getTopDoctors,
    getDepartmentWorkload
} from "./dashboard.controller.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);

router.get("/appointment-status",getAppointmentStatusSummary);

router.get("/top-doctors", getTopDoctors);

router.get("/department-workload", getDepartmentWorkload);

export default router;