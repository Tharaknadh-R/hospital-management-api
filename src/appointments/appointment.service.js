import pool from "../../db/db.js";

//Get All Appointments (JOIN)
export const getAllAppointmentsService = async () => {
    const result = await pool.query(
        ` 
        SELECT 
            a.appointment_id AS "appointmentId",
            d.doctor_name AS "doctorName",
            p.patient_name As "patientName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN patients p ON a.patient_id = p.patient_id
        ORDER BY a.appointment_id
        `
    );
    return result.rows;
};

//Get Appointment By ID 
export const getAppointmentByIdService = async (id) => {
    const result = await pool.query(
        `
        SELECT 
            a.appointment_id AS "appointmentId",
            d.doctor_name AS "doctorName",
            p.patient_name AS "patientName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN patients p ON a.patient_id = p.patient_id
        WHERE a.appointment_id = $1
        `,
        [id]
    );
    return result.rows[0];
};

//Validate Doctor
export const checkDoctorExists = async (doctorId) => {
    const result = await pool.query(
        "SELECT * FROM doctors WHERE doctor_id =$1",
        [doctorId]
    );
    return result.rows[0];
};

//validate Patient
export const checkPatientExists = async (patientId) => {
    const result = await pool.query(
        "SELECT * FROM patients WHERE patient_id = $1",
        [patientId]
    );
    return result.rows[0];
};

//Create Appointment
export const createAppointmentService = async (
    doctorId,
    patientId,
    appointmentDate,
    status
) => {
    const result = await pool.query(
        `
        INSERT INTO appointments
        (
            doctor_id,
            patient_id,
            appointment_date,
            status
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            doctorId,
            patientId,
            appointmentDate,
            status
        ]

    );
    return result.rows[0];
};

//Update Appointment
export const updateAppointmentService = async (
    id,
    doctorId,
    patientId,
    appointmentDate,
    status
) => {
    const result = await pool.query(
        `
        UPDATE appointments
        SET
            doctor_id =$1,
            patient_id = $2,
            appointment_date = $3,
            status = $4
        WHERE appointment_id = $5
        RETURNING *
        `,
        [
            doctorId,
            patientId,
            appointmentDate,
            status,
            id
        ]
    );

    return result.rows[0];
};

//Delete Appointment
export const deleteAppointmentService = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM appointments
        WHERE appointment_id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

//API 2 get appointment by status 
export const getAppointmentsByStatusService = async (
    status
) => {
    const result = await pool.query(
        `
        SELECT 
            a.appointment_id AS "appointmentId",
            d.doctor_name AS "doctorName",
            p.patient_name AS "patientName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN patients p ON a.patient_id = p.patient_id
        WHERE a.status = $1
        ORDER BY a.appointment_date
        `,
        [status]
    );

    return result.rows;
};

//Pagination
export const getAppointmentsWithPaginationService = async (
    page,
    limit
) => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `
        SELECT 
            a.appointment_id AS "appointmentId",
            d.doctor_name AS "doctorName",
            p.patient_name AS "patientName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN patients p ON a.patient_id = p.patient_id
        ORDER BY a.appointment_id
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );
    return result.rows;
};
