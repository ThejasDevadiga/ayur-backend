const PatientShema = require("../../models/Patient/PatientDataSchema");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const generateId = require("../../utils/GenerateId");
const TimeSlot = require("../../models/Patient/TimeSlots");
const Appointments = require('../../models/Receptionist/Appointments')

const updatePatientData = asyncHandler(async (req, res, next) => {
  const { requestedId, PatientId, updateBasic, updateDocument, updateDisease } =
    req.body;
  try {
    const Findresult = await PatientShema.findOne({ PatientID: PatientId });
    
    if (!Findresult) {
      res.status(500).json({
        acknowledged: false,
        data: "Patient not found!",
       
      });
    }
    const updatedBasic = Object.assign(Findresult.Basic, updateBasic);
    const updatedDisease = Object.assign(Findresult.Disease, updateDisease);
    var UpdatedDocs = Object.values(Findresult.Documents);
    UpdatedDocs.push(updateDocument);
    const Updateresult = await PatientShema.updateOne(
      { PatientID: PatientId },
      {
        $set: {
          Basic: updatedBasic,
          Disease: updatedDisease,
          Documents: UpdatedDocs,
        },
      }
    );

    if (Updateresult) {
      res.status(201).json({
        acknowledged: true,
        PatientId: Updateresult.PatientId,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while updating data");
    }
  } catch (err) {
    res.status(400).json({
      acknowledged: true,
      token: generateToken(requestedId),
      message: err.message,
    });
  }
});

const updateTimeSlots = asyncHandler(async (req, res, next) => {
  try {
    const { TimeSlotID,  newStartTime, newEndTime } = req.body;

    const timeslot = await TimeSlot.findOne({ TimeSlotID: TimeSlotID });
    if (!timeslot) {
      throw new Error("TimeSlot not found");
    }

    timeslot.startTime = newStartTime;
    timeslot.endTime = newEndTime;
    const updatedTimeSlot = await TimeSlot.save();

    res.status(200).json({
      acknowledged: true,
      message: "TimeSlot updated successfully",
      data: updatedTimeSlot,
    });
  } catch (err) {
    res.status(400).json({
      acknowledged: false,
   
      message: "Error while updating timeslot",
    });
  }
});

const appointmentStatus = asyncHandler(async (req, res, next)=>{
  try {
    const { Status,ID, requestedId } = req.body;
    if (!ID && !Status && !requestedId) {
      throw new Error("ID,Status, requestedId not found");
    }
    // console.log(ID);
    const appoints = await Appointments.findOne({ AppointmentID: ID });
    // console.log(appoints);
    if (appoints==null) {
      throw new Error("Appointments not found");
    }
     appoints.Status = Status;

     const updatedAppointment = await Appointments.updateOne(
      { AppointmentID: ID },
      appoints
    );

      res.status(200).json({
      acknowledged: true,
      message: "Appointment updated successfully",
      data: updatedAppointment
    });

  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: err.message,
    });
  }
  
})



module.exports = { updatePatientData, updateTimeSlots,appointmentStatus };
