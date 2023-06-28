const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const EmployeeShema = require("../../models/Employee/EmployeeDataScheme");
const DrugDetails = require("../../models/Consultant/drugDetails");
const Appointments = require("../../models/Receptionist/Appointments");
const PatientData = require("../../models/Patient/PatientDataSchema");
const consultants = require("../../models/Consultant/consultantList");

const getEmployeeData = asyncHandler(async (req, res) => {
  const { requestedId } = req.body;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter Projection  not found");
  }
  if (!filter.Hospital) {
    throw new Error("Hospital details not found");
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

const getEmployeeStatus = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    acknowledged: true,
    message: "Data Added Successfully",
  });
});

const getDrugDetails = asyncHandler(async (req, res) => {
  const { requestedId } = req.body;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter Projection  not found");
  }
  if (!filter.Hospital) {
    throw new Error("Hospital details not found");
  }

  try {
    const result = await DrugDetails.find({ filter }, { projection });
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
//

const genderCounts = asyncHandler(async(req,res)=>{
  const { requestedId } = req.body;
  


})
 
module.exports = {
  getDrugDetails,
  getEmployeeData,
  getEmployeeStatus,
};
