const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const PatientDetails = require("../../models/Patient/PatientDataSchema");
const Appointments = require("../../models/Receptionist/Appointments");
const Wardens = require("../../models/wardens/wardensList");
const Doctors = require("../../models/Consultant/consultantList");

const wardensAppointments = asyncHandler(async (req, res) => {
  const { requestedId, wardenID, date } = req.body;
  try {
    if (!requestedId) {
      throw new Error(" Requesting Id  is not defined!!");
    }
    const wardenRes = await Wardens.findOne({ EmployeeID: wardenID });
    if (!wardenRes) {
      throw new Error(`Couldn't find the wardens`);
    }
    const wardenId = wardenRes._id;

    const result = await Appointments.find(
      { WardenID: wardenId, "Timing.date": { $gte: date } },
      {}
    )
      .populate({
        path: "PatientID",
        model: PatientDetails,
      })
      .populate({
        path: "DoctorID",
        model: Doctors,
      });
    function mapData(data) {
      return data.map((item) => {
        const {
          DoctorID: { Name, Department, Specialties },
          Status,
          Timing,
          PatientID: {
            Basic: { Fname, Mname, Lname, Gender, Age },
          },
        } = item;

        return {
          PatientName: Fname + " " + Mname + " " + Lname,
          Sex: Gender,
          Age: Age,
          DoctorName: Name,
          DoctorDepartment: Department,
          DoctorSpecialties: Specialties,
          Status: Status,
          Timing: Timing,
        };
      });
    }
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: mapData(result),
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

module.exports = {
  wardensAppointments,
};
