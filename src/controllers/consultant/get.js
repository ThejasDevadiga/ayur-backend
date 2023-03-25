const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
// const ConsultingPatient = require("../../models/Patient/ConsultPatientList");
const patientData = require("../../models/Patient/PatientDataSchema");
const Prescriptions = require("../../models/Consultant/prescriptions")
const Appointment = require("../../models/Receptionist/Appointments")
const consultants = require('../../models/Consultant/consultantList')
const Wardens  = require('../../models/wardens/wardensList');
 

const PatientDetails = asyncHandler(async (req, res, next) => {
  const { requestedId, filter } = req.body;
  if (!requestedId && !filter) {
    throw new Error(" Requesting Id, Filter, projections are  required");
  }
  const projection = {};
  try {
    const result = await patientData.find({ filter }, { projection });
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

// const consultingPatientList = asyncHandler(async (req, res, next) => {
//   const { requestedId } = req.body.requestedId;
//   const { filter, projection } = req.body;
//   if (!filter && !projection) {
//     throw new Error("Filter and projection are required");
//   }
//   try {
//     const result = await ConsultingPatient.find({ filter }, { projection });
//     if (result.length > 0) {
//       res.status(200).json({
//         acknowledged: true,
//         data: result,
//         token: generateToken(requestedId),
//       });
//     } else if (result.length == 0) {
//       throw new Error("No data found in the Consulting list");
//     } else {
//       throw new Error("Error while finding waiting patient ");
//     }
//   } catch (error) {
//     res.status(400).json({
//       acknowledged: true,
//       data: error.message,
//       token: generateToken(requestedId),
//     });
//   }
// });

const TodaysAppointments = asyncHandler(async (req, res, next) => {
  try {
    const {requestedId,DoctorID,Date} = req.body;
    if (!requestedId || !DoctorID || !Date) {
      throw new Error("requested id , filter or pojection not found");
    }
    
    const todaysAppointments = await Appointment.find({Status:"APPROVED"},{_id:0,createdAt:0,updatedAt:0,__v:0})
    .populate({
      path: "PatientID",
      model: patientData,
    })
    .populate({
      path: "DoctorID",
      model: consultants,
    })
    
    
    if (!todaysAppointments || todaysAppointments==[]) {
      throw new Error("No Appointments found");
    }
    const filteredAppointments = todaysAppointments.filter(appointment => {
      return (
        appointment.Timing.date === Date && 
        appointment.DoctorID.ConsultantID === DoctorID
      );
    });

   const extractedData =  filteredAppointments.map((item) => {
      const {
        Timing:{time},
        PatientID:{Basic: { Fname, Mname, Lname, Gender, Age},PatientID},
        AppointmentID
      } = item;
      return {
        AppointmentID,
        Name: Fname + " " + Mname + " " + Lname,
        Sex: Gender,
        Age:Age+" years",     
        patientID: PatientID,
        Time:time+".00 - "+(parseInt(time)+1)+".00"
      };
    });
    //  console.log(extractedData);
    res.status(200).json({
      acknowledged: true,
      data: extractedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      
      acknowledged: false,
      message: "Error while fetching appointment list",
    });
  }
});


const GetPrescription = asyncHandler(async (req, res, next) => {
  try {
    const PrescriptionID = req.body.PrescriptionID;
    // Check if Prescription exists
    const prescription = await Prescriptions.findOne({
      PrescriptionID: PrescriptionID,
    });
    if (!prescription) {
      throw new Error("Prescription not found");
    }
    
    res.status(200).json({
      acknowledged: true,
      data: prescription,
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: "Error while fetching prescription",
    });
  }
});

const patientAppointments = asyncHandler(async (req, res, next) => {
  try {
    const {requestedId,AppointmentID} = req.body;
    if (!requestedId || !AppointmentID ) {
      throw new Error("requested id , AppointmentID not found");
    }
    
    const appointmentData = await Appointment.find({AppointmentID},{_id:0,createdAt:0,updatedAt:0,__v:0})
    .populate({
      path: "PatientID",
      model: patientData,
      populate:{
        path:"Appointments",
        model:Appointment
      }
    })
    .populate({
      path: "DoctorID",
      model: consultants,
    })
   
    if (!appointmentData) {
      throw new Error("Appointments not found");
    }
    
    res.status(200).json({
      acknowledged: true,
      data: appointmentData,
    });
  }
  catch{
    res.status(500).json({
      acknowledged: false,
      message: "Error while fetching prescription",
    });
  }
})
    
    
 

module.exports = {
  PatientDetails,
  patientAppointments,
  TodaysAppointments,
  GetPrescription,
};
