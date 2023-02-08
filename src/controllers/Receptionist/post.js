const PatientDetails = require("../../models/Patient/PatientDataSchema");
const Appointments = require("../../models/Receptionist/Appointments");
const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");

const AddPatientData = asyncHandler(async (req, res) => {
  try {
    const requestedId = req.body;
      
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
    } = req.body;

    const findPatient = await PatientDetails.findOne({ PatientID: PatientId });
    if (findPatient) {
      throw new Error("Patient already exists in PatientDetails");
    }

    const result = await PatientDetails.create({
      PatientID: PatientId,
      Basic: {
        Fname: Fname,
        Mname: Mname,
        Lname: Lname,
        DateOfBirth: DateOfBirth,
        Email: Email,
        Phone: Phone,
        Gender: Gender,
        Age: Age,
        Address: Address,
        City: City,
        State: State,
        Country: Country,
        Zip: Zip,
      },
    });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        PatientId: result.PatientID,
        PatientName: result.Basic.Fname+" "+result.Basic.Mname+" "+result.Basic.Lname,
        message: "Data inserted successfully",
        // token: generateToken(requestedId),
      });
    } else {
      throw new Error(
        "Error occured while Inserting the data to PatientDetails"
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      acknowledged: false,
      // token: generateToken(requestedId),
      message: err.message,
    });
  }
});

const AddPatientToconsultant = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    acknowledged: true,
    message: "Data Added Successfully",
  });
});
const MoveToApproved = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    acknowledged: true,
    message: "Data Added Successfully",
  });
});

const AcknoledgeWarden = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    acknowledged: true,
    message: "Data Added Successfully",
  });
});

const makeAppointment = asyncHandler(async (req, res, next) => {
  try {
    const {
      requestedId,
      PatientID,
      AppointmentID,
      date,
      time,
      doctorID,
      doctorName,
      department,
      Symptoms,
      Description,
      WardenName,
      WardenID,
    } = req.body;
    const result = await Appointments.create({
      AppointmentID: AppointmentID,
      PatientID: PatientID,
      Timing: {
        date: date,
        time: time,
      },
      Doctor: {
        doctorID: doctorID,
        doctorName: doctorName,
        department: department,
      },
      Disease: {
        Symptoms: Symptoms,
        Description: Description,
      },
      Warden: {
        WardenName: WardenName,
        WardenID: WardenID,
      },
    });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        PatientId: result.AppointmentID,
        message: "Appointment booked",
        // token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error occured while Inserting the data to Appointments");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      acknowledged: false,
      // token: generateToken(requestedId),
      message: err.message,
    });
  }
});
module.exports = {
  AddPatientData,
  AddPatientToconsultant,
  MoveToApproved,
  AcknoledgeWarden,
  makeAppointment
};
