const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Prescriptions = require('../../models/Consultant/prescriptions')
const PatientShema = require('../../models/Patient/PatientDataSchema')
const EmployeeSchema = require('../../models/Employee/EmployeeDataScheme')
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


  if (!requestedId || !PrescriptionID || !patientId || !consultantID || !AppointmentID) {
    throw new Error("Required fields missing");
  }
  const patientResult = await PatientShema.findOne({ PatientID: patientId })
  const patientID = patientResult._id
  const employeeRes = await EmployeeSchema.findOne({ EmployeeID: consultantId })
  const consultantID = employeeRes._id
  const appointmentRes = await EmployeeSchema.findOne({ AppointmentID: AppointmentId })
  const AppointmentID = appointmentRes._id
  
  
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
  res.status(400).json({
    acknowledged: false,
    message: "Error while adding data",
  });
}
});

module.exports = {
  makePrescription,
};
