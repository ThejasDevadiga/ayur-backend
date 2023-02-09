const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Departments = require("../../models/Consultant/Departments");

const DepartmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  if (!requestedId) {
    throw new Error("requestedId not found");
  }
  try {
    const result = await Departments.find({  }, { _id:0 });
    if (result.length!=0) {
      res.status(200).json({
        success: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

module.exports = {
  DepartmentsList,
};
