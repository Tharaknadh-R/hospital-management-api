//Doctor Validation
export const validateDoctor = (req, res, next) =>{
    const{
        doctorName,
        departmentId,
        specialization
    } = req.body;

    if(!doctorName){
        return res.status(400).json({
            message:"doctorName is required"
        });
    }

    if(!departmentId){
        return res.status(400).json({
            message: "departmentId is required"
        });
    }

    if(!specialization){
        return res.status(400).json({
            message: "Specialization is required"
        });
    }
    next();
};

//Patient Validation
export const validatePatient = (req, res, next) =>{
    const{
        patientName,
        gender
    } = req.body;

    if(!patientName){
        return res.status(400).json({
            message: "patientName is required"
        });
    }

    if(!gender){
        return res.status(400).json({
            message: "gender is required"
        });
    }
    next();
};

//Appointment Validation
export const validateAppointment = (req, res, next)=>{
    const{
        doctorId,
        patientId,
        appointmentDate,
        status
    } = req.body;

    if(!doctorId){
        return res.status(400).json({
            message: "doctorId is required"
        });
    }

    if(!patientId) {
        return res.status(400).json({
            message: "patientId is required"
        });
    }

    if(!appointmentDate){
        return res.status(400).json({
            message:"appointmentDate is required"
        });
    }

    if(!status){
        return res.status(400).json({
            message: "status is required"
        });
    }

    const allowedStatus = [
        "Scheduled",
        "Completed",
        "Cancelled",
        "No Show"
    ];

    if(!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Status must be Scheduled, Completed, Cancelled or No Show"
        });
    }
    next();
};

