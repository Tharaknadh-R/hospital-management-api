import {
    getAllPatientsService,
    getPatientByIdService,
    createPatientService,
    updatePatientService,
    deletePatientService,
    getPatientsByCityService,
    getPatientHistoryService,
    getPatientsWithPaginationService
} from "./patient.service.js";

//get all patients 
export const getAllPatients = async (req,res) =>{
    try{
        //logic for API3 start
        const{city, page, limit} = req.query;
        //search by city
        if(city){
            const patients = await getPatientsByCityService(city);
            return res.status(200).json(patients);
        }
        //logic for Api3 end

        //Pagination
        if(page && limit) {
            const patients = await getPatientsWithPaginationService(
                Number(page),
                Number(limit)
            );

            return res.status(200).json(patients);
        }

        //get All
        const patients = await getAllPatientsService();
        res.status(200).json(patients);

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//get patient details by id 
export const getPatientById = async (req,res) =>{
    try{
        const patient = await getPatientByIdService(
            req.params.id 
        );
        if(!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }
        res.status(200).json(patient);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//create Patient 
export const createPatient = async(req, res) => {
    try{
        const{
            patientName,
            gender,
            city,
            dateOfBirth
        } = req.body;

        const patient = await createPatientService(
            patientName,
            gender,
            city,
            dateOfBirth
        );

        res.status(201).json({
            message: "Patient Created Successfully",
            data: patient
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Update Patient
export const updatePatient = async(req,res) => {
    try{
        const{
            patientName,
            gender,
            city,
            dateOfBirth
        } = req.body;

        const patient = await updatePatientService(
            req.params.id,
            patientName,
            gender,
            city,
            dateOfBirth
        );

        if(!patient){
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json({
            message: "Patient Updated Successfully",
            data: patient
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Delete Patient 
export const deletePatient = async(req,res) => {
    try{
        const patient = await deletePatientService(req.params.id);

        if(!patient){
            return res.status(404).json({
                message: "Patient not found"
            });
        }
        res.status(200).json({
            message: "Patient Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//GET patient Appointment History
export const getPatientHistory = async(req,res) => {
    try{
        const patient = await getPatientByIdService(
            req.params.id
        );

        if(!patient){
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const history = await getPatientHistoryService(
            req.params.id
        );

        res.status(200).json({
            patientId: patient.patient_id,
            patientName: patient.patient_name,
            appointments: history.map((appointment) => ({
                appointmentId: appointment.appointmentId,
                doctorName: appointment.doctorName,
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