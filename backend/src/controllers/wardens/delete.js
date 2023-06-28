const ReceptionistSchema = require('../../models/Patient/waitingPatientList')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
 
 

const deletePatientData = asyncHandler(async (req, res) => {
    const {PatientId,requestedId} = req.body
    if (!PatientId) {
        res.status(400).json({
            acknowledged: true,
            token:generateToken(requestedId),
            message:"Patient not found"})
    }
    else{
        try{
          const findPatient = await PatientShema.findOne({PatientID:PatientId},{'_id':0});
        if (!findPatient) { 
          throw new Error("Patient data not found!")
        }
            const result = await PatientShema.deleteOne({PatientID: PatientId})
            if (result){
                res.status(200).json({
                acknowledged: true,
                token:generateToken(requestedId),
                message:"Patient deleted successfully"})
                }
            else{
                res.status(400).json({
                acknowledged: true,
                token:generateToken(requestedId),
                message:"Error while deleting data"})
            }
        }
        catch(err){
            res.status(400).json({
                acknowledged: true,
                token:generateToken(requestedId),
                message:err.message})
        }
    }
})
module.exports = {deletePatientData,proceedWaitingToConsult};