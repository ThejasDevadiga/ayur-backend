const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Prescriptions = require('../../models/Consultant/prescriptions')


const makePrescription = asyncHandler(async (req, res, next) => {
  const { requestedId, patientName, patientID, drugList } = req.body;

  // const findPatient = await Prescriptions.findOne({ patientID });

  // if (findPatient) {
  //   throw new Error("Patient already exists in the prescription list");
  // }
 
  try {
    const prescription = await Prescriptions.create({
      patientName: patientName,
      patientID: patientID,
      drugList: drugList,
    });

    if(prescription) {
      res.status(200).json({
        acknowledged: true,
        message: "Prescription added successfully",
      });
    } else {
      throw new Error("Error while adding prescription");
    }
  } catch (err) {
    res.status(400).json({
      acknowledged: false,
      message: err.message,
    });
  }
});

module.exports = {
  makePrescription,
};
