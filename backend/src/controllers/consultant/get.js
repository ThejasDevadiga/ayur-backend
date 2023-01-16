const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const ConsultingPatient = require('../../models/Patient/ConsultPatientList')
const patientData = require('../../models/Patient/PatientDataSchema')
 
 const PatientDetails  = asyncHandler(async (req, res, next) => {     
    const {requestedId,filter} = req.body;
    if (!requestedId && !filter) {
        throw new Error(" Requesting Id, Filter, projections are  required")
    }
    try {
        const result = await patientData.find({filter},{projection})
        if (result ==[]){
            throw   new Error("No data found ")
        }
        else if (result){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else{
           throw new Error("Error while finding the patientData")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            message: error.message,
            token:generateToken(requestedId)
        })
    }
})


const consultingPatientList = asyncHandler(async (req, res, next)=>{
    const {requestedId} = req.body.requestedId;
    const {filter,projection} = req.body;
    if (!filter && !projection) {
        throw new Error("Filter and projection are required")
    }
    try {
        const result = await ConsultingPatient.find({filter},{projection})
        if (result.length>0){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else if (result.length==0){
            throw new Error("No data found in the Consulting list")
        }
        else{
            throw new Error("Error while finding waiting patient ")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data:error.message,
            token:generateToken(requestedId)
        })
    }
})

const AppointmentList  = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        acknowledged : true,
        message : 'Data Added Successfully',
        
})
})
 


module.exports = {
    PatientDetails,
    consultingPatientList,
    AppointmentList
}
