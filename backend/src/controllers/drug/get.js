const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const DrugsDetail = require("../../models/Consultant/drugDetails");

const drugsList = asyncHandler(async (req, res, next) => {
  const { requestedId, filter, projection } = req.body;
  if (!requestedId && !filter && !projection) {
    throw new Error(" Requesting Id, Filter, projections are  required");
  }
  if (!filter.Hospital) {
    throw new Error("Hospital details not found");
  }
  try {
    const result = await DrugsDetail.find({ filter }, { projection });
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the DrugsDetail");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

module.exports = {
  drugsList,
};
