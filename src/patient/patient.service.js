import pool from "../../db/db.js";

//Get all Patients
export const getAllPatientsService = async() => {
    const result = await pool.query(
        "SELECT * FROM patients"
    );
    return result.rows; 
};

//Get Patient By ID 
export const getPatientByIdService = async(id) => {
    const result = await pool.query(
        "SELECT * FROM patients WHERE patient_id = $1",
        [id]
    );
    return result.rows[0];
};

//Create Patient
export const createPatientService = async(
    patientName,
    gender,
    city,
    dateOfBirth
) => {
    const result = await pool.query(
        `
        INSERT INTO patients
        ( 
            patient_name,
            gender,
            city,
            date_of_birth
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            patientName,
            gender,
            city,
            dateOfBirth
        ]
    );

    return result.rows[0];
};

// Update Patient 
export const updatePatientService = async(
    id,
    patientName,
    gender,
    city,
    dateOfBirth
) => {
    const result = await pool.query(
        `
        UPDATE patients 
        SET 
            patient_name = $1,
            gender = $2,
            city = $3,
            date_of_birth = $4
        WHERE patient_id = $5
        RETURNING *
        `,
        [
            patientName,
            gender,
            city,
            dateOfBirth,
            id
        ]
    );
    return result.rows[0];
};

//Delete Patient
export const deletePatientService = async(id) => {
    const result = await pool.query(
        `
        DELETE FROM patients
        WHERE patient_id = $1
        RETURNING *
        `,
        [id]
    );
    return result.rows[0];
};

//API 3 get patients by city
export const getPatientsByCityService = async (city) =>{
    const result = await pool.query(
        `
        SELECT 
            patient_id AS "patientId",
            patient_name AS "patientName",
            gender,
            city,
            date_of_birth AS "dateOfBirth"
        FROM patients
        WHERE city = $1
        ORDER BY patient_name
        `,
        [city]
    );
    return result.rows;
};

//Get Patient Appointment History 
export const getPatientHistoryService = async(patientId) => {
    const result = await pool.query(
        `
        SELECT
            p.patient_id AS "patientId",
            p.patient_name AS "patientName",
            a.appointment_id AS "appointmentId",
            d.doctor_name AS "doctorName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM patients p
        JOIN appointments a ON p.patient_id = a.patient_id
        JOIN doctors d ON a.doctor_id = d.doctor_id
        WHERE p.patient_id = $1
        ORDER BY a.appointment_date
        `,
        [patientId]
    );

    return result.rows;
};

//Patient Pagination Logic

export const getPatientsWithPaginationService = async(
    page,
    limit 
) => {
    const offset = (page-1)*limit;
    const result = await pool.query(
        `
        SELECT 
            patient_id AS "patientId",
            patient_name AS "patientName",
            gender,
            city,
            date_of_birth AS "dateOfBirth"
        FROM patients
        ORDER BY patient_id
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );

    return result.rows;
};
