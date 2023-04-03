const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");

const Patient = require('../../models/Patient/PatientDataSchema')
const appointments = require('../../models/Receptionist/Appointments')
 
const patientcounts = async (req, res) => {
  const { requestedId } = req.body;

  try {
    // Aggregate patients by age gap of 10 and gender
    const result = await Patient.aggregate([
      {
        $group: {
          _id: {
            ageGap: {
              $subtract: [
                {
                  $floor: {
                    $divide: ["$Basic.Age", 10]
                  }
                },
                {
                  $mod: [
                    {
                      $floor: {
                        $divide: ["$Basic.Age", 10]
                      }
                    },
                    1
                  ]
                }
              ]
            },
            gender: "$Basic.Gender"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.ageGap": 1, "_id.gender": 1 }
      }
    ]);

    res.status(200).json({
      acknowledged: true,
      data: result,

    });
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
       
    });
  }
};

 

module.exports = {
patientcounts}