import pool from "../../db/db.js";

//dashboard Summary
export const getDashboardSummaryService = async() => {

    const doctors = await pool.query( 
        "SELECT COUNT(*) FROM doctors"
    );

    const patients = await pool.query(
        "SELECT COUNT(*) FROM patients"
    );

    const appointments = await pool.query(
        "SELECT COUNT(*) FROM appointments"
    );

    return {
        totalDoctors: Number(doctors.rows[0].count),
        totalPatients: Number(patients.rows[0].count),
        totalAppointments: Number(appointments.rows[0].count)
    };
};

//Appointment Status Summary
export const getAppointmentStatusSummaryService = async() => {
    const result = await pool.query(
        `
        SELECT
            COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
            COUNT(*) FILTER (WHERE status ='Cancelled') AS cancelled,
            COUNT(*) FILTER (WHERE status ='Scheduled') AS scheduled,
            COUNT(*) FILTER (WHERE status ='No Show') AS "noShow"
        FROM appointments
        `
    );

    return {
        completed: Number(result.rows[0].completed),
        cancelled: Number(result.rows[0].cancelled),
        scheduled: Number(result.rows[0].scheduled),
        noShow: Number(result.rows[0].noShow)
    };
};

//get Top doctor 
export const getTopDoctorsService = async() => {
    const result = await pool.query(
        `
        SELECT 
            d.doctor_id AS "doctorId",
            d.doctor_name AS "doctorName",
            COUNT(a.appointment_id) AS "appointmentCount"
        FROM doctors d
        JOIN appointments a ON d.doctor_id = a.doctor_id
        GROUP BY d.doctor_id, d.doctor_name
        ORDER BY COUNT(a.appointment_id) DESC`
    );

    return result.rows.map((doctor) => ({
        ...doctor,
        appointmentCount: Number(doctor.appointmentCount)
    }));
};

//Department Workload 
export const getDepartmentWorkloadService = async() => {
    const result = await pool.query(
        `
        SELECT 
            dp.department_name AS "departmentName",
            COUNT(a.appointment_id) AS "appointmentCount"
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN departments dp ON d.department_id = dp.department_id
        GROUP BY dp.department_name
        ORDER BY COUNT(a.appointment_id) DESC
        `
    );

    return result.rows.map((department) => ({
        ...department,
        appointmentCount: Number(department.appointmentCount)
    }));
}