import {
    getAllDoctorsService,
    getDoctorsByIdService,
    createDoctorService,
    updateDoctorDetails,
    deleteDoctorService,
    getDoctorAppointmentService,
    getDoctorsByDepartmentService
} from "./doc.service.js";

//To GET all doctors
export const getAllDoctors = async(req, res) => {
    try{
        const {department} = req.query;

        if(department) {
            const doctors = await getDoctorsByDepartmentService(department);
            
            return res.status(200).json(doctors);
        }
        
        const doctors = await getAllDoctorsService();
        res.status(200).json(doctors);
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//To get Doctor BY ID
export const getDoctorByID = async(req,res) =>{
    try{
        const doctor = await getDoctorsByIdService(
            req.params.id
        );

        if(!doctor){
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        res.status(200).json(doctor);
    } catch(error) {
        res.status(500).json({ 
            message: error.message,
        });
    }
};


// TO Create A new Doctor
export const createDoctor = async(req,res)=> {
    try{
        const{
            doctorName,
            departmentId,
            specialization,
            experienceYears
        } = req.body;
        
        const doctor = await createDoctorService(
            doctorName,
            departmentId,
            specialization,
            experienceYears
        );

        res.status(201).json({
            message: "Doctor Created",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//To Update A doctor details 

export const updateDoctor = async(req,res) =>{
    try{
        const{
            doctorName,
            departmentId,
            specialization,
            experienceYears
        } = req.body;

        const doctor = await updateDoctorDetails(
            req.params.id,
            doctorName,
            departmentId,
            specialization,
            experienceYears
        );
        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }
        res.status(200).json({
            message: "Doctor Updated",
            data: doctor,
        });
    } catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
};

//to delete a doctor details 
export const deleteDoctor = async(req,res) => {
    try{
        await deleteDoctorService(req.params.id);

        if (!doctor) {
            return res.status(404).json({
            message: "Doctor not found"
        });
}
        res.status(200).json({
            message: "Doctor Deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Get doctor appointment details 
export const getDoctorAppointments = async(req,res) =>{
    try{
         const doctor = await getDoctorsByIdService(
            req.params.id
        );

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }
        const appointments = await getDoctorAppointmentService(
            req.params.id
        );
        res.status(200).json({
            doctorName: doctor.doctorName,
            appointments: appointments.map((appointment) => ({
                appointmentId: appointment.appointmentId,
                patientName: appointment.patientName,
                appointmentDate: appointment.appointmentDate,
                status: appointment.status
            }))
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};