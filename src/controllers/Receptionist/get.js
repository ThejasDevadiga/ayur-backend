const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const patientData = require("../../models/Patient/PatientDataSchema");
const EmployeeShema = require("../../models/Employee/EmployeeDataScheme");
const consultants = require("../../models/Consultant/consultantList");
const Appointment = require("../../models/Receptionist/Appointments");
const Wardens = require("../../models/wardens/wardensList");
const TimeSlot = require("../../models/Patient/TimeSlots");
const { PatientDetails } = require("../../../client/controller/receptionist/recept");

const availableDoctor = asyncHandler(async (req, res, next) => {
  try {
    const {requestedId, department, date, time } = req.body;
    const appointmentTimings = await Appointment.find({
      "Timing.date": date,
      "Timing.time": time,
    });
    // console.log("Appointments",appointmentTimings);
    const busyConsultants = appointmentTimings.map((appointment) => {
      return appointment.DoctorID;
    });
    // console.log("Busy consultants",busyConsultants);
    const availableConsultants = await consultants.find({
      Department: department,
      _id: { $nin: busyConsultants },
    },{Name:1});
    console.log("Available consultants",availableConsultants);
    res.status(200).json({
      success: true,
      data: availableConsultants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


const EmployeeData = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter Projection  not found");
  }
  try {
    const result = await EmployeeShema.find({ filter }, { projection });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      token: generateToken(requestedId),
    });
  }
});



const PatientWithAppointments = asyncHandler(async (req, res, next) => {
  const { requestedId, patientID } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  if (!patientID) {
    throw new Error("request id not found");
  }
  try {
    
    const result = await patientData
      .findOne({ PatientID: patientID }, { PatientID:1,Basic: 1, Appointments: 1, _id: 0 })
      .populate({
        path: "Appointments",
        model: Appointment,
      });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        // token:generateToken(requestedId)
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      // token:generateToken(requestedId)
    });
  }
});

const ReqAppointmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  if (requestedId) {
    throw new Error("request id not found");
  }
  try {
    const result = await Appointment.find({ Status: "REQUESTED" });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      token: generateToken(requestedId),
    });
  }
});

const AppAppointmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  if (requestedId) {
    throw new Error("request id not found");
  }
  try {
    const result = await Appointment.find({ Status: "APPROVED" });
    if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      token: generateToken(requestedId),
    });
  }
});

const AllottedTimeSlots = asyncHandler(async (req, res, next) => {
  try {
    const { requestedId, date } = req.body;

    const allottedSlots = await TimeSlot.find({
      date: date,
      Status: "Busy",
    }
    ,{_id:0,slot:1}
    );
    return res.status(200).json({
      success: true,
      data: allottedSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

const WardenDetails = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body.requestedId;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter and projection are required");
  }
  try {
    const result = await Wardens.find({ filter }, { projection });
    if (result.length > 0) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else if (result.length == 0) {
      throw new Error("No data found in the waiting list");
    } else {
      throw new Error("Error while finding waiting patient ");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      token: generateToken(requestedId),
    });
  }
});

const getPatientData = asyncHandler(async (req, res) => {
  const { requestedId, filter, projection } = req.body;
  if (!requestedId && !filter && !projection) {
    throw new Error(" Requesting Id, Filter, projections are  required");
  }
  try {
    const result = await patientData.find( {filter} ,{_id:0});
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

const getAppointmentDetails = asyncHandler(async (req, res) => {
  const { requestedId,DoctorId} = req.body;
  if (!requestedId && !filter) {
    throw new Error(" Requesting Id or filter  is missing!!");
  }
  try {
      const DocResult = await consultants.findOne({ConsultantID:DoctorId});
      if(!DocResult){
        throw new Error(`Couldn't find the Consultants`)
      }
      const DoctorID = DocResult._id
      console.log(DoctorID);
    const result = await Appointment.find( {DoctorID:DoctorID} ,{_id:0,Timing:1,PatientID:1})
    .populate({
      path: "PatientID",
      model: patientData,
    });
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
    res.status(500).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});


module.exports = {
  getPatientData,
  availableDoctor,
  PatientWithAppointments,
  EmployeeData,
  ReqAppointmentsList,
  AppAppointmentsList,
  AllottedTimeSlots,
  WardenDetails,
  getAppointmentDetails
};
