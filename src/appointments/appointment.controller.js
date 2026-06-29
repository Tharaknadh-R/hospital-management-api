import {
    getAllAppointmentsService,
    getAppointmentByIdService,
    createAppointmentService,
    updateAppointmentService,
    deleteAppointmentService,
    checkDoctorExists,
    checkPatientExists,
    getAppointmentsByStatusService,
    getAppointmentsWithPaginationService
} from "./appointment.service.js";

//Get All appointment service details
export const getAllAppointments = async (req,res) =>{
    try{
        //Logic for API 2 TO get appointments by status service start
        const {status, page,limit} = req.query;
        //Search Appointment By Status
        if(status) {
            const appointments = await getAppointmentsByStatusService(status);
            return res.status(200).json(appointments);
        }
        //Logic end
        //pagination
        if(page && limit){
            const appointments = await getAppointmentsWithPaginationService(
                Number(page),
                Number(limit)
            );
            return res.status(200).json(appointments);
        }
        //Get all appointments
        const appointments = await getAllAppointmentsService();
        res.status(200).json(appointments);
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Get appointments by id
export const getAppointmentById = async (req,res) => {
    try{
        const appointment = await getAppointmentByIdService(
            req.params.id
        );
        if(!appointment){
            return res.status(404).json({
                message: "Appointment not found"
            });
        }
        res.status(200).json(appointment);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Create appointment
export const createAppointment = async(req,res) => {
    try{
        const{
            doctorId,
            patientId,
            appointmentDate,
            status
        } = req.body;

        const doctor = await checkDoctorExists(doctorId);

        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        const patient = await checkPatientExists(patientId);

        if(!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const appointment = await createAppointmentService(
            doctorId,
            patientId,
            appointmentDate,
            status
        );

        res.status(201).json({
            message: "Appointment Created",
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//update appointment Details
export const updateAppointment = async(req,res) => {
    try{
        const{
            doctorId,
            patientId,
            appointmentDate,
            status
        } = req.body;

        const appointment = await updateAppointmentService(
            req.params.id,
            doctorId,
            patientId,
            appointmentDate,
            status
        );

        if (!appointment) {
            return res.status(404).json({
            message: "Appointment not found"
        });
}
        res.status(200).json({
            message: "Appointment Updated",
            data: appointment
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//To Delete an Appointment
export const deleteAppointment = async(req,res) => {
    try {
        const appointment = await deleteAppointmentService(
            req.params.id
        );
        if (!appointment) {
            return res.status(404).json({
            message: "Appointment not found"
        });
    }
        res.status(200).json({
            message: "Appointment Deleted"
        });

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};