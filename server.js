import express from "express";
import dotenv from "dotenv";
import pool from "./db/db.js";

import doctorRoutes from "./src/doctor/doc.router.js";
import patientRoutes from "./src/patient/patient.router.js";
import appointmentRoutes from "./src/appointments/appointment.router.js";
import {loggerMiddleware} from "./src/middleware/logger.middleware.js";
import dashboardRoutes from "./src/dashboard/dashboard.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

// Test Database Connection 
try{
    await pool.query("SELECT NOW()");
    console.log("Database Connected Successfully");
} catch(error) {
    console.log(error.message);
}
//root Route
app.get("/", (req,res) => {
    res.send("Hospital API Running");
});

//Doctor Routes
app.use("/api/doctors", doctorRoutes);
//Patient Routes
app.use("/api/patients", patientRoutes);
//Appointment Routes
app.use("/api/appointments",appointmentRoutes);
//Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
});