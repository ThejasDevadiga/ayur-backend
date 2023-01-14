const PatientDetails = require('../../models/Patient/PatientDataSchema')
const WaitingPatientList = require('../../models/Patient/waitingPatientList')
const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
 
const AddPatientData = asyncHandler(async (req, res) => {
  const requestedId = req.body
  try{  
  const {
        PatientId,
        Fname,
        Mname,
        Lname,
        DateOfBirth,
        Email,
        Phone,
        Gender,
        Age,
        Address,
        City,
        State,
        Country,
        Zip,
        AdharNumber,
        BloodGroup,
        DiseaseName,
        Category,   
    } = req.body;
    const findPatient = await PatientDetails.findOne({PatientID:PatientId});
    if (findPatient) {
        throw new Error(  "Patient already exists in PatientDetails"
        )
    }
   
    const result = await PatientDetails.create({
      PatientID:PatientId,
        Basic:{
            Fname:Fname,
            Mname:Mname,
            Lname:Lname,
            DateOfBirth:DateOfBirth,
            Email:Email,
            phone:Phone,
            Gender:Gender,
            Age:Age,
            Address:Address,
            City:City,
            State:State,
            Country:Country,
            Zip:Zip
        },
        Documents:{
            AdharNumber:AdharNumber,
            BloodGroup:BloodGroup,
        },
        Disease:{
            DiseaseName:DiseaseName,
            Category:Category,
            DiagnosisTime:Date(Date.now()).toString().slice(16,24),
            DiagnosisDate:Date(Date.now()).toString().slice(0,15),
        }
    });
    if (result) {
      const findPatient = await WaitingPatientList.findOne({PatientID:result.PatientID},{'_id':0});
      if (findPatient) { 
        throw new Error( "Patient already exists in WaitingPatientList"
        )
      }
      else{
        const insertedResult = await WaitingPatientList.create({PatientID:result.PatientID, Status:"Waiting"}) 
         if (!insertedResult) {
            const deletePatient = await PatientDetails.deleteOne({PatientID:result.PatientID})
            throw new Error("Error occured while Inserting the data to Waitinglist" )
         }
         else{      
            res.status(201).json({
            acknowledged: true,
            PatientId: result.PatientId,
            message:"Data inserted successfully",
            token:generateToken(requestedId)
          });
        } 
      }
    } else {
      throw new Error("Error occured while Inserting the data to PatientDetails")
    }
    }catch(err){
      console.log(err.message);
      res.status(400).json({
        acknowledged : true,
        token:generateToken(requestedId),
        message : err.message
      })
    }
})

const AddPatientToconsultant  = asyncHandler(async (req, res, next) => {
  res.status(200).json({
      acknowledged : true,
      message : 'Data Added Successfully',
      token: generateToken(requestedId)
})
})
const MoveToApproved  = asyncHandler(async (req, res, next) => {
  res.status(200).json({
      acknowledged : true,
      message : 'Data Added Successfully',
      token: generateToken(requestedId)
})
})

const AcknoledgeWarden  = asyncHandler(async (req, res, next) => {
  res.status(200).json({
      acknowledged : true,
      message : 'Data Added Successfully',
      token: generateToken(requestedId)
})
})


module.exports = {
            AddPatientData,
            AddPatientToconsultant,
            MoveToApproved,
            AcknoledgeWarden,
};
