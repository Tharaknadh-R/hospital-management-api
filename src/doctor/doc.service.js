import pool from "../../db/db.js";

//to GET all dcotors from Doctors table
export const getAllDoctorsService = async() => {
    const result = await pool.query(
        "Select * From doctors"
    );
    return result.rows;
};

//GET doctor By ID
export const getDoctorsByIdService = async(id) => {
    const result = await pool.query(
        `
        SELECT 
            d.doctor_id AS "doctorId",
            d.doctor_name AS "doctorName",
            dp.department_name AS "department",
            d.specialization AS "specialization",
            d.experience_years AS "experienceYears"
        FROm doctors d
        JOIN departments dp ON d.department_id = dp.department_id
        Where d.doctor_id = $1
        `,
        [id]
    );

    return result.rows[0];
};

//To Create a New Doctor
export const createDoctorService = async( 
    doctorName,
    departmentId,
    specialization,
    experienceYears
) => {
    const result = await pool.query(
        `
        INSERT INTO doctors
        (
        doctor_name,
        department_id,
        specialization,
        experience_years
        )
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [
            doctorName,
            departmentId,
            specialization,
            experienceYears,
        ]
    );

    return result.rows[0];
};

//To update Doctor details 
export const updateDoctorDetails = async(
    id,
    doctorName,
    departmentId,
    specialization,
    experienceYears
) => {
    const result = await pool.query(
        `
        UPDATE doctors 
        SET 
        doctor_name=$1,
        department_id=$2,
        specialization=$3,
        experience_years=$4 
        WHERE doctor_id = $5
        RETURNING *
        `,
        [
        doctorName,
        departmentId,
        specialization,
        experienceYears,
        id,
        ]
    );

    return result.rows[0];
};

//To Delete a Doctor details 
export const deleteDoctorService = async(id) => {
    const result = await pool.query(
        `
        DELETE FROM doctors
        WHERE doctor_id=$1
        RETURNING *
        `,
        [id]
    );
    return result.rows[0];
};

//Get Appointments for a Doctor API
export const getDoctorAppointmentService = async (doctorId) => {
    const result = await pool.query(
        `
        SELECT
            d.doctor_name AS "doctorName", 
            a.appointment_id AS "appointmentId",
            p.patient_name AS "patientName",
            a.appointment_date AS "appointmentDate",
            a.status
        FROM doctors d
        JOIN appointments a ON d.doctor_id = a.doctor_id
        JOIN patients p ON a.patient_id = p.patient_id
        WHERE d.doctor_id = $1
        ORDER BY a.appointment_date
        `,
        [doctorId]
    );
    return result.rows;
};

//Search Doctors by Department
export const getDoctorsByDepartmentService = async(department) => {
    const result = await pool.query(
        `
        SELECT
            d.doctor_id AS "doctorId",
            d.doctor_name AS "doctorName",
            dp.department_name AS "department",
            d.specialization AS "specialization",
            d.experience_years AS "experienceYears"
        FROM doctors d 
        JOIN departments dp ON d.department_id = dp.department_id
        WHERE dp.department_name = $1
        ORDER BY d.doctor_name
        `,
        [department]
    );

    return result.rows;
};