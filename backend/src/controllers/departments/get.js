const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Departments = require("../../models/Consultant/Departments");
// create mongo schema patern
const DepartmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId,Hospital } = req.body;
  if (!requestedId) {
    
    res.status(400).json({
      success: false,
      message:"Request ID not found",
      token: generateToken(requestedId),
    })
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
      
    res.status(500).json({
      success: false,
      message: "Data doesn't exist!",
      data : [],
      token: generateToken(requestedId),
    }) } 
  }
  catch (error) {
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
