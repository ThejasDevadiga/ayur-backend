const PatientShema = require("../../models/Patient/PatientDataSchema");
// const WaitingSchema = require('../../models/Patient/waitingPatientList')
const ConsultPatient = require("../../models/Patient/ConsultPatientList");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Appointment = require("../../models/Receptionist/Appointments")


const deletePatientData = asyncHandler(async (req, res) => {
  const { PatientId, requestedId } = req.body;
  if (!PatientId) {
    res.status(400).json({
      acknowledged: true,
      token: generateToken(requestedId),
      message: "Patient not found",
    });
  } else {
    try {
      const findPatient = await PatientShema.findOne(
        { PatientID: PatientId },
        { _id: 0 }
      );
      if (!findPatient) {
        throw new Error("Patient data not found!");
      }
      const result = await PatientShema.deleteOne({ PatientID: PatientId });
      if (result) {
        res.status(200).json({
          acknowledged: true,
          token: generateToken(requestedId),
          message: "Patient deleted successfully",
        });
      } else {
        res.status(400).json({
          acknowledged: true,
          token: generateToken(requestedId),
          message: "Error while deleting data",
        });
      }
    } catch (err) {
      res.status(400).json({
        acknowledged: true,
        token: generateToken(requestedId),
        message: err.message,
      });
    }
  }
});

const DeleteAppointment = asyncHandler(async (req, res, next) => {
     try {
      const { AppointmentID } = req.body;
      // Check if appointment exists
      const appointment = await Appointment.findOne({ AppointmentID: AppointmentID });
      if (!appointment) {
        throw new Error("Appointment not found");
      }

      // Delete the appointment
      const result = await Appointment.deleteOne({AppointmentID: AppointmentID });
      if (result.deletedCount === 0) {
        throw new Error("Error while Appointments  ");
      }

      res.status(200).json({
        acknowledged: true,
        message: "Appointment deleted successfully",
      });
      
    } catch (err) {
      res.status(400).json({
        acknowledged: false,
        message: "Error while deleting appointment",
      });
    }
  });
 
module.exports = { deletePatientData, DeleteAppointment };
