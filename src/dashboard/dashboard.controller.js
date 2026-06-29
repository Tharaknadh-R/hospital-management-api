import {
    getDashboardSummaryService,
    getAppointmentStatusSummaryService,
    getTopDoctorsService,
    getDepartmentWorkloadService
} from "./dashboard.service.js";

//Dashboard summary
export const getDashboardSummary = async (req,res) => {
    try{
        const summary = await getDashboardSummaryService();
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } 

};

//Appointment Status summary
export const getAppointmentStatusSummary = async(req,res) => {
    try{
        const summary = await getAppointmentStatusSummaryService();
        res.status(200).json(summary);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//TOP doctors
export const getTopDoctors = async(req,res) => {
    try{
        const doctors = await getTopDoctorsService();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Department Workload
export const getDepartmentWorkload = async(req,res)=> {
    try{
        const workload = await getDepartmentWorkloadService();
        res.status(200).json(workload);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};