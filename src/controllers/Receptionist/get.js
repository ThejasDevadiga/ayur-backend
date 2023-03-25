const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const patientData = require("../../models/Patient/PatientDataSchema");
const EmployeeShema = require("../../models/Employee/EmployeeDataScheme");
const consultants = require("../../models/Consultant/consultantList");
const Appointment = require("../../models/Receptionist/Appointments");
const Wardens = require("../../models/wardens/wardensList");
const TimeSlot = require("../../models/Patient/TimeSlots");
 
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
    // console.log("Available consultants",availableConsultants);
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
    throw new Error("Patient id not found");
  }
  try {
    
    const result = await patientData
      .findOne({ PatientID: patientID }, {  _id: 0 })
      .populate({
        path: "Appointments",
        model: Appointment,
        populate:{
          path: "DoctorID",
          model: consultants,
        }
      });
    if (result) {
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
});

const ReqAppointmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  try {
    const result = await Appointment.find({ Status: "REQUESTED" })
    .populate({
      path: "PatientID",
      model: patientData,
    })
    .populate({
      path: "DoctorID",
      model: consultants,
    });
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
  if (!requestedId) {
    throw new Error("request id not found");
  }
  try {
    const result = await Appointment.find({ Status: "APPROVED" })
    .populate({
      path: "PatientID",
      model: patientData,
    })
    .populate({
      path: "DoctorID",
      model: consultants,
    });
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
      message: "Server Error :"+error,
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
// getAppointmentList

function extractedData(data) {
  return data.map((item) => {
    const {
      Timing:{date,time},
      PatientID:{Basic: { Fname, Mname, Lname, Gender, Phone, Age },
                PatientID},
      DoctorID:{Name,Department,Specialities},
      Status  ,
      AppointmentID    
    } = item;
    return {
      Name: Fname + " " + Mname + " " + Lname,
      Sex: Gender,
      PhoneNo: Phone,
      Age:Age,
      ID: PatientID,
      Status:Status,
      date:date,
      time:parseInt(time),
      DoctorName :Name,
      Department,
      Specialities,
      AppointmentID,
      imgUrl: "/images/img_avatar.png"
    };
  });
}

const getAppointmentList = asyncHandler(async (req, res) => {
  const { requestedId,filter} = req.body;
  if (!requestedId && filter) {
    throw new Error(" Requesting Id  or filter is missing!!");
  }
  try {
    const result = await Appointment.find( filter ,{_id:0})
    .populate({
      path: "PatientID",
      model: patientData,
    })
    .populate({
      path: "DoctorID",
      model: consultants,
    });
    
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      const data = extractedData(result);
     
      res.status(200).json({
        acknowledged: true,
        data: data,
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

const getDoctorList = asyncHandler(async (req, res, next) => {
  try {
    const { requestedId,filter,projection } = req.body;
    if(!requestedId && !filter && !projection){
      throw new Error(" Requesting Id  or filter is missing!!");
    }
    const DocList = await consultants.find({},{_id:0,EmployeeID:0} );
    if(!DocList){
      throw new Error("No data found ");
    }
    return res.status(200).json({
      success: true,
      data: DocList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error :"+error,
    });
  }
});
module.exports = {
  getPatientData,
  getAppointmentList,
  availableDoctor,
  PatientWithAppointments,
  EmployeeData,
  ReqAppointmentsList,
  AppAppointmentsList,
  AllottedTimeSlots,
  WardenDetails,
  getAppointmentDetails,
  getDoctorList
};
