// const ReceptionistPatients = require('../../models/wardens/')
const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const PatientDetails = require("../../models/Patient/PatientDataSchema")
const Appointments = require("../../models/Receptionist/Appointments")

const MakeAppointment = asyncHandler(async(req,res)=>{
  const requestedId = req.body
  try{  
    const {
      AppointmentID,
          Fname,
          Mname,
          Lname,
          DateOfBirth,
          Phone,
          Gender,
          DiseaseName,
          Category, 
          symptoms, 
          Hospital
      } = req.body;
      if(!Hospital){
        throw new Error("Hospital details not found");
        }
      const findAppointment = await Appointments.findOne({AppointmentID:AppointmentID});
      if (findAppointment) {
          throw new Error("Appointment already exists in Appointments"
          )
      }
      const result = await Appointments.create({
        AppointmentID:AppointmentID,
          Basic:{
              Fname:Fname,
              Mname:Mname,
              Lname:Lname,
              DateOfBirth:DateOfBirth,
              phone:Phone,
              Gender:Gender,
              Age:Age,
          },
          Issues:{
              DiseaseName:DiseaseName,
              Category:Category,
              Symptoms:symptoms,
              DiagnosisTime:Date(Date.now()).toString().slice(16,24),
              DiagnosisDate:Date(Date.now()).toString().slice(0,15),
        },
        Hospital
      });
      if (result) {     
              res.status(201).json({
              acknowledged: true,
              AppointmentID: result.AppointmentID,
              message:"Appointment inserted successfully",
              token:generateToken(requestedId)
            });
        }
      else {
        throw new Error("Error occured while Inserting the data to PatientDetails")
      }
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({
          acknowledged : true,
          token:generateToken(requestedId),
          message : err.message
        })
      }
  })


const insertPatientData = asyncHandler(async (req, res) => {
  const requestedId = req.body
  try{  
  const {
        PatientId,
        Fname,
        Mname,
        Lname,
        DateOfBirth,
        Phone,
        Gender,
        DiseaseName,
        Category, 
        symptoms, 
    } = req.body;
    const findPatient = await PatientDetails.findOne({PatientID:PatientId});
    if (findPatient) {
        throw new Error("Patient already exists in PatientDetails"
        )
    }
    const result = await PatientDetails.create({
      PatientID:PatientId,
        Basic:{
            Fname:Fname,
            Mname:Mname,
            Lname:Lname,
            DateOfBirth:DateOfBirth,
            phone:Phone,
            Gender:Gender,
            Age:Age,
        },
        Issues:{
            DiseaseName:DiseaseName,
            Category:Category,
            Symptoms:symptoms,
            DiagnosisTime:Date(Date.now()).toString().slice(16,24),
            DiagnosisDate:Date(Date.now()).toString().slice(0,15),
      }
    });
    if (result) {     
            res.status(201).json({
            acknowledged: true,
            PatientId: result.PatientId,
            message:"Data inserted successfully",
            token:generateToken(requestedId)
          });
      }
    else {
      throw new Error("Error occured while Inserting the data to PatientDetails")
    }
  }
  catch(err){
      console.log(err.message);
      res.status(400).json({
        acknowledged : true,
        token:generateToken(requestedId),
        message : err.message
      })
    }
})


module.exports = {insertPatientData,MakeAppointment};
