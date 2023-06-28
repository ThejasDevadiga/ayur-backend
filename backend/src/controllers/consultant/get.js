const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
// const ConsultingPatient = require("../../models/Patient/ConsultPatientList");
const patientData = require("../../models/Patient/PatientDataSchema");
const Prescriptions = require("../../models/Consultant/prescriptions")
const Appointment = require("../../models/Receptionist/Appointments")
const consultants = require('../../models/Consultant/consultantList')
const Wardens  = require('../../models/wardens/wardensList');
const Vitals = require('../../models/Receptionist/patientVitals')
const Employee = require('../../models/Employee/EmployeeDataScheme')

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


const TodaysAppointments = asyncHandler(async (req, res, next) => {
  try {
    const {requestedId,DoctorID,Date,Hospital} = req.body;
    if (!requestedId || !DoctorID || !Date) {
      throw new Error("requested id , filter or pojection not found");
    }
    if(!Hospital){
    throw new Error("Hospital details not found");
    }
    
    console.log([Date,DoctorID,Hospital]);
    const todaysAppointments = await Appointment.find({Status:"APPROVED",Hospital},{_id:0,createdAt:0,updatedAt:0,__v:0})
    .populate({
      path: "PatientID",
      model: patientData,
    })
    .populate({
      path: "DoctorID",
      model: consultants,
      populate:{
      path:"EmployeeID",
      model:Employee
      }
    })
    
    // console.log(todaysAppointments);
    
    if (!todaysAppointments || todaysAppointments==[]) {
      throw new Error("No Appointments found");
    }
    const filteredAppointments = todaysAppointments.filter(appointment => {
      console.log([appointment.Timing.date,Date]);

      return (
        appointment.Timing.date === Date && 
        appointment.DoctorID.EmployeeID['EmployeeID'] === DoctorID
        
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
     console.log(extractedData);
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
    const Hospital = req.body.Hospital;
    if(!Hospital){
      throw new Error("Hospital details not found");
      }
    const prescription = await Prescriptions.findOne({
      PrescriptionID: PrescriptionID,Hospital
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

  const { requestedId, patientID } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  
  if (!patientID) {
    throw new Error("Patient id not found");
  }
 
  try {
    let todayDate = new Date().toISOString().slice(0, 10);
    // console.log(todayDate);
    const result = await patientData
      .findOne({ PatientID: patientID }, {  _id: 0 })
      .populate({
        path: "Appointments",
        model: Appointment,
        match: {Status:"CONSULTED" },
        // match: { "Timing.date": { $ne: todayDate },Status:"CONSULTED" },
        populate:[{
          path: "DoctorID",
          model: consultants,
        },
        {
          path:"VitalsData",
          model:Vitals
        }
      ],
      });
    if (result) {
        //  match: { "Timing.date": { $ne: "2023-02-20" } },
      
      res.status(200).json({
        acknowledged: true,
        data: result,
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
     
    });
  }
})





const getVitalsDetails =asyncHandler(async(req,res)=>{
  try {
    const vitalDataID = req.body.vitalDataID;
    // Check if Prescription exists
    const VitalsData = await Vitals.findOne({
      vitalDataID: vitalDataID,
    })
    .populate({
      path: "PatientID",
      model: patientData,
    })
    if (!VitalsData) {
      throw new Error("VitalsData not found");
    }
    
    res.status(200).json({
      acknowledged: true,
      data: VitalsData,
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: "Error while fetching VitalsData",
    });
  }
})





module.exports = {
  // PatientDetails,
  patientAppointments,
  TodaysAppointments,
  GetPrescription,
  getVitalsDetails
};


