
const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Prescriptions = require("../../models/Consultant/prescriptions");
const PatientShema = require("../../models/Patient/PatientDataSchema");
const EmployeeSchema = require("../../models/Employee/EmployeeDataScheme");
const Vitals = require("../../models/Receptionist/patientVitals");
const Appointment = require('../../models/Receptionist/Appointments')
const makePrescription = asyncHandler(async (req, res, next) => {
  try {
    const {
      requestedId,
      PrescriptionID,
      patientId,
      consultantId,
      AppointmentId,
      drugList,
      prescriptions,
    } = req.body;

    if (
      !requestedId ||
      !PrescriptionID ||
      !patientId ||
      !consultantID ||
      !AppointmentID
    ) {
      throw new Error("Required fields missing");
    }
    const patientResult = await PatientShema.findOne({ PatientID: patientId });
    const patientID = patientResult._id;
    const employeeRes = await EmployeeSchema.findOne({
      EmployeeID: consultantId,
    });
    const consultantID = employeeRes._id;
    const appointmentRes = await EmployeeSchema.findOne({
      AppointmentID: AppointmentId,
    });
    const AppointmentID = appointmentRes._id;

    const newPrescription = new Prescriptions({
      PrescriptionID,
      patientID,
      consultantID,
      AppointmentID,
      drugList,
      prescriptions,
    });

    const result = await newPrescription.save();
    if (!result) {
      throw new Error("Error while adding data");
    }

    res.status(200).json({
      acknowledged: true,
      message: "Prescription data added successfully",
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: "Error while adding data",
    });
  }
});

const uploadVitalsDetails = asyncHandler(async (req, res, next) => {
  try {
    const {
      requestedId,
      vitalDataID,
      PatientID,
      temperature,
      weight,
      height,
      pulse,
      bloodPressure,
      AppointmentID,
      respiratoryRate,
    } = req.body.Vitals;
 
    if (!requestedId && !vitalDataID) {
      throw new Error("requestedId and  vitalDataID fields missing");
    }

    const patientResult = await PatientShema.findOne({ PatientID: PatientID });
    if (!patientResult) {
      
      
      throw new Error("Patient data not found");
    }

    const patientId = patientResult._id;

    const vitalData = await Vitals.findOne({ vitalDataID: vitalDataID });
    if (vitalData) {
      throw new Error("Vitals Data already exists");
    }

    const result = await Vitals.create({
      vitalDataID,
      PatientID: patientId,
      temperature,
      weight,
      height,
      pulse,
      bloodPressure,
      respiratoryRate,
    });

    if (!result) {
      throw new Error("Error while adding data");
    }
     const storeIdInPatient = await Appointment.findOneAndUpdate(
      { AppointmentID: AppointmentID },
      {
        $set: {
          VitalsData: result._id,
        },
      }
    );

    if (!storeIdInPatient) {
      throw new Error("Error while updating Appointment");
    }

    res.status(200).json({
      acknowledged: true,
      dataID: storeIdInPatient,
      message: "vitalData data added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      acknowledged: false,
      message: " " + err,
    });
  }
});

module.exports = {
  makePrescription,
  uploadVitalsDetails,
};
