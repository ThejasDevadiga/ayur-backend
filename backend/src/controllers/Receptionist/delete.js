const PatientShema = require('../../models/Patient/PatientDataSchema')
const WaitingSchema = require('../../models/Patient/waitingPatientList')
const ConsultPatient = require('../../models/Patient/ConsultPatientList')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
 
const proceedWaitingToConsult = asyncHandler(async(req,res) =>{         
    const {
          requestedId,
          PatientId,
      } = req.body;
      if (!requestedId && !PatientId){
        throw new Error("Requested id or Patient id doesnt exists")
      }
      try{ 
      const findPatient = await WaitingSchema.findOne({PatientID:PatientId},{'_id':0});
      if (!findPatient) { 
        throw new Error("Patient data not found!")
      }
        const insertedResult = await ConsultPatient.create({PatientID:PatientId,Status:"Consulting"}) 
         if (!insertedResult) {
           throw new Error("Error occured while Inserting the data to Consultantlist")
        }
        const Deleteresult = await WaitingSchema.deleteOne({PatientID:PatientId})
          if (!Deleteresult) {
            throw new Error("Error occured while Deleting the data to Waiting list")
          }
              if (updatePatientStatus(PatientId,"Consulting")){ 
              res.status(200).json({
                acknowledged : true,
                message : 'Data Added Successfully',
                token: generateToken(requestedId)
          })
              }
              else {
                throw new Error("Error occured while Updating the data in Patient Records")
            }
  }catch(err){
    res.status(400).json({
      acknowledged : true,
      token:generateToken("Failed"),
      message : err.message
    })
  }
  })

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

const DeleteAppointment  = asyncHandler(async (req, res, next) => {
  res.status(200).json({
      acknowledged : true,
      message : 'Data Added Successfully',
      token: generateToken(requestedId)
})
})

module.exports = {deletePatientData,proceedWaitingToConsult,DeleteAppointment};
