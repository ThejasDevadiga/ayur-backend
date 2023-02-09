const PatientDetails = require("../../models/Patient/PatientDataSchema");
const Appointments = require("../../models/Receptionist/Appointments");
const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Consultants = require("../../models/Consultant/consultantList");
const Wardens = require("../../models/wardens/wardensList")
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
        PatientName:
          result.Basic.Fname +
          " " +
          result.Basic.Mname +
          " " +
          result.Basic.Lname,
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

 

const MoveToApproved = asyncHandler(async (req, res, next) => {
  const {requestedId,appointmentID} = req.body;
    
    if (!appointmentID) {
      return res.status(400).json({
        acknowledged: false,
        error: "Appointment ID and new status are required fields."
      });
    }
  
    try {
      const appointment = await Appointments.findOne({ AppointmentID: appointmentID });
      if (!appointment) {
        return res.status(404).json({
          acknowledged: false,
          error: "Appointment not found."
        });
      }
  
      appointment.Status = "Apporoved";
      await appointment.save();
  
      res.status(200).json({
        acknowledged: true,
        message: "Appointment status updated successfully."
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        acknowledged: false,
        message: err.message,
      });
    }
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
        Symptoms,
        Description,
        WardenID,
      } = req.body;
      const PatResult = await PatientDetails.findOne({PatientID:PatientID});
      if(!PatResult){
        throw new Error(`Couldn't find the Patient`)
      }
      const WdnResult = await Wardens.findOne({EmployeeID:WardenID});
      if(!WdnResult){
        throw new Error(`Couldn't find the Warden`)
      }
      const WardenId = WdnResult._id
      const PatientId = PatResult._id
      // console.log(DocResult,WdnResult);
      // console.log(doctorId,WardenId);

      const result = await Appointments.create({
        AppointmentID: AppointmentID,
        DoctorID:doctorID,
        WardenID: WardenId,
        PatientID:PatientId,
        Timing: {
          date: date,
          time: time,
        },
        Disease: {
          Symptoms: Symptoms,
          Description: Description,
        },
      })
      if (!result) {
        throw new Error("Error while creating Appointments");
      }
      const patient = await PatientDetails.findOneAndUpdate(
        { PatientID:PatientID },
        {
          $push: {
            Appointments: result._id,
          },
        },
        { new: true, upsert: true }
      );
      if (patient) {
        res.status(200).json({
          acknowledged: true,
          PatientId: result.AppointmentID,
          message: "Appointment booked",
        });
      } else {
        throw new Error("Error occured while Inserting the data to Appointments");
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        acknowledged: false,
        message: err.message,
      });
    }
  });
  

module.exports = {
  AddPatientData,
   MoveToApproved,
  AcknoledgeWarden,
  makeAppointment,
};
