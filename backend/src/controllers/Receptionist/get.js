const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const csv = require("fast-csv");
const fs = require("fs");

const patientData = require("../../models/Patient/PatientDataSchema");
const EmployeeShema = require("../../models/Employee/EmployeeDataScheme");
const consultants = require("../../models/Consultant/consultantList");
const Appointment = require("../../models/Receptionist/Appointments");
const Wardens = require("../../models/wardens/wardensList");
const TimeSlot = require("../../models/Patient/TimeSlots");
const Vitals = require("../../models/Receptionist/patientVitals");
const Prescriptions = require("../../models/Consultant/prescriptions");
const Patient = require("../../models/Patient/PatientDataSchema");
// const
const getPatientIdList = asyncHandler(async (req, res) => {
  try {
    const { requestedId, Name } = req.body;

    if (!requestedId) {
      throw new Error("requestedId details not found");
    }
    const result = await patientData.find(
      {
        $or: [
          { "Basic.Fname": { $regex: Name, $options: "i" } },
          { "Basic.Mname": { $regex: Name, $options: "i" } },
          { "Basic.Lname": { $regex: Name, $options: "i" } },
        ],
      },
      {
        PatientID: 1,
        "Basic.Fname": 1,
        "Basic.Mname": 1,
        "Basic.Lname": 1,
        _id: 0,
      }
    );

    if (!result) {
      console.log("error occured");
    }
    res.status(200).json({
      acknowledged: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: true,
      message: err,
    });
  }
});

const appointmentList = asyncHandler(async (req, res) => {
  try {
    const { requestedId, filter, projection } = req.body;

    if (!requestedId) {
      throw new Error("requestedId   not found");
    }
    const result = await Appointment.find(filter, projection)
      .populate({
        path: "DoctorID",
        model: consultants,
      })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "WardenID",
        model: Wardens,
      });

    if (!result) {
      console.log("error occured");
    }
    console.log(result);
    function extractData(data) {
      return data.map((item) => {
        const {
          Timing: { date, time },
          Disease: { Description },
          AppointmentID,
          DoctorID: { Name, Department },
          PatientID: {
            Basic: { Fname, Mname, Lname },
          },
          Status,
          Reason,
        } = item;

        return {
          Name: Fname + " " + Mname + " " + Lname,
          Date: date,
          Time: time + ".00",
          Description,
          AppointmentID,
          DoctorName: Name,
          Department,
          Status,
          Reason,
        };
      });
    }
    res.status(200).json({
      acknowledged: true,
      data: extractData(result),
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: true,
      message: err,
    });
  }
});
const getHospitalList = asyncHandler(async (req, res) => {
  try {
    const { requestedId } = req.body;
    if (!requestedId) {
      throw new Error("requested id not found");
    }
    const Hospitals = [
      {
        Name: "Ayurveda",
        Branch: "Vidyagiri",
      },
      {
        Name: "Naturopathy",
        Branch: "Shobhavana",
      },
      {
        Name: "Homeopathy",
        Branch: "Shobhavana",
      },
      {
        Name: "Health care",
        Branch: "Vidhyagiri",
      },
    ];
    res.status(200).json({
      acknowledged: true,
      data: Hospitals,
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: true,
      message: err,
    });
  }
});

const availableDoctor = asyncHandler(async (req, res, next) => {
  try {
    const { requestedId, department, date, Hospital, time } = req.body;
    if (!Hospital) {
      throw new Error("Hospitals details not found");
    }
    const appointmentTimings = await Appointment.find({
      Hospital,
      "Timing.date": date,
      "Timing.time": time,
    });

    // console.log("Appointments",appointmentTimings);
    const busyConsultants = appointmentTimings.map((appointment) => {
      return appointment.DoctorID;
    });
    // console.log("Busy consultants",busyConsultants);
    const availableConsultants = await consultants.find(
      {
        Department: department,
        _id: { $nin: busyConsultants },
      },
      { Name: 1 }
    );
    // console.log("Available consultants",availableConsultants);
    res.status(200).json({
      success: true,
      data: availableConsultants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const EmployeeData = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter Projection  not found");
  }
  if (!filter.Hospital) {
    throw new Error("Hospitals details not found");
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

const PatientWithAppointments = asyncHandler(async (req, res, next) => {
  const { requestedId, patientID } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  if (!patientID) {
    throw new Error("Patient id not found");
  }
  try {
    const result = await patientData
      .findOne({ PatientID: patientID }, { _id: 0 })
      .populate({
        path: "Appointments",
        model: Appointment,
        populate: [
          {
            path: "DoctorID",
            model: consultants,
          },
          {
            path: "VitalsData",
            model: Vitals,
          },
        ],
      });

    if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
      });
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
    });
  }
});

const ReqAppointmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId, Hospital } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  if (!Hospital) {
    throw new Error("Hospitals details not found");
  }
  try {
    const result = await Appointment.find({ Status: "REQUESTED", Hospital })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "DoctorID",
        model: consultants,
      });
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

const AppAppointmentsList = asyncHandler(async (req, res, next) => {
  const { requestedId, Hospital } = req.body;
  if (!requestedId) {
    throw new Error("request id not found");
  }
  if (!Hospital) {
    throw new Error("Hospitals details not found");
  }
  try {
    const result = await Appointment.find({ Status: "APPROVED", Hospital })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "DoctorID",
        model: consultants,
      });
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

const AllottedTimeSlots = asyncHandler(async (req, res, next) => {
  try {
    const { requestedId, Hospital, date } = req.body;
    console.log(date);
    console.log(Hospital);
    const allottedSlots = await TimeSlot.find(
      {
        date: date,
        Status: "Busy",
        Hospital,
      },
      { _id: 0, slot: 1 }
    );
    return res.status(200).json({
      success: true,
      data: allottedSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error :" + error,
    });
  }
});

const WardenDetails = asyncHandler(async (req, res, next) => {
  const { requestedId } = req.body.requestedId;
  const { filter, projection } = req.body;
  if (!filter && !projection) {
    throw new Error("Filter and projection are required");
  }
  try {
    const result = await Wardens.find({ filter }, { projection });
    if (result.length > 0) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else if (result.length == 0) {
      throw new Error("No data found in the waiting list");
    } else {
      throw new Error("Error while finding waiting patient ");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      data: error.message,
      token: generateToken(requestedId),
    });
  }
});

const getPatientData = asyncHandler(async (req, res) => {
  const { requestedId, filter, projection } = req.body;
  if (!requestedId && !filter && !projection) {
    throw new Error(" Requesting Id, Filter, projections are  required");
  }
  try {
    const result = await patientData.find({ filter }, { _id: 0 });
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(400).json({
      acknowledged: true,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

const getDoctAppointmentDetails = asyncHandler(async (req, res) => {
  const { requestedId, DoctorId, Hospital } = req.body;
  if (!requestedId && !filter) {
    throw new Error(" Requesting Id or filter  is missing!!");
  }
  try {
    const DocResult = await consultants.findOne({ ConsultantID: DoctorId });
    if (!DocResult) {
      throw new Error(`Couldn't find the Consultants`);
    }
    const DoctorID = DocResult._id;

    const result = await Appointment.find(
      { DoctorID: DoctorID, Hospital },
      { _id: 0, Timing: 1, PatientID: 1 }
    ).populate({
      path: "PatientID",
      model: patientData,
    });
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(500).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

const getAppointmentDetail = asyncHandler(async (req, res) => {
  const { requestedId, appointmentId } = req.body;
  if (!requestedId && !filter) {
    throw new Error(" Requesting Id or filter  is missing!!");
  }
  try {
    const result = await Appointment.findOne({ AppointmentID: appointmentId })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "DoctorID",
        model: consultants,
      })
      .populate({
        path: "VitalsData",
        model: Vitals,
      })
      .populate({
        path: "PrescriptionID",
        model: Prescriptions,
      });
    if (result == null) {
      throw new Error("No data found ");
    } else if (result) {
      res.status(200).json({
        acknowledged: true,
        data: result,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(500).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

function extractAppointment(data) {
  return data.map((item) => {
    const {
      Timing: { date, time },
      PatientID: {
        Basic: {
          Fname,
          Mname,
          Lname,
          Gender,
          Phone,
          Age,
          Address,
          City,
          State,
          Country,
        },
        PatientID,
      },
      Disease: { Symptoms, Description },
      VitalsData: {
        vitalDataID,
        temperature,
        weight,
        height,
        pulse,
        bloodPressure,
        respiratoryRate,
      },
      PrescriptionID: { PrescriptionID, drugList, prescriptions },
      DoctorID: { Name, Department, Specialties },
      Status,
      AppointmentID,
    } = item;
    return {
      Name: Fname + " " + Mname + " " + Lname,
      Sex: Gender,
      PhoneNo: Phone,
      Age: Age,
      Address: Address + " " + City + " " + State + " " + Country,
      ID: PatientID,
      Date: date.toString(),
      Symptoms: Symptoms[0],
      Description: Description,
      Time: parseInt(time),
      "VitalData ID": vitalDataID,
      Temperature: temperature,
      Weight: weight,
      Height: height,
      Pulse: pulse,
      "Blood Pressure": bloodPressure["systolic"],
      "Respiratory Rate": respiratoryRate,
      "Prescription ID": PrescriptionID,
      // drugList,
      Prescriptions: prescriptions,
      DoctorName: Name,
      Department,
      Specialties,
      AppointmentID,
      imgUrl: "/images/img_avatar.png",
    };
  });
}

const consultedAppointments = asyncHandler(async (req, res) => {
  const { requestedId, filter, Hospital } = req.body;
  if (!requestedId) {
    throw new Error(" Requesting Id  or filter is missing!!");
  }
  if (!filter) {
    throw new Error("Filter details not found");
  }
  // if (!projection) {
  //   throw new Error("projection details not found");
  // }
  if (!Hospital) {
    throw new Error("Hospitals details not found");
  }
  const defaultFIlter = { Status: "CONSULTED", Hospital: JSON.parse(Hospital) };
  const filters = { ...defaultFIlter, ...filter };
  console.log(filters);
  try {
    const result = await Appointment.find(filters, { _id: 0 })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "DoctorID",
        model: consultants,
      })
      .populate({
        path: "VitalsData",
        model: Vitals,
      })
      .populate({
        path: "PrescriptionID",
        model: Prescriptions,
      });

    // console.log(result);
    if (result && result.length == 0) {
      throw new Error("No data found ");
    } else if (result) {
      const data = extractAppointment(result);

      res.status(200).json({
        acknowledged: true,
        data: data,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(500).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

function extractedData(data) {
  return data.map((item) => {
    const {
      Timing: { date, time },
      PatientID: {
        Basic: { Fname, Mname, Lname, Gender, Phone, Age },
        PatientID,
      },
      DoctorID: { Name, Department, Specialties },
      Status,
      AppointmentID,
    } = item;
    return {
      Name: Fname + " " + Mname + " " + Lname,
      Sex: Gender,
      PhoneNo: Phone,
      Age: Age,
      ID: PatientID,
      Status: Status,
      date: date,
      time: parseInt(time),
      DoctorName: Name,
      Department,
      Specialties,
      AppointmentID,
      imgUrl: "/images/img_avatar.png",
    };
  });
}

const getAppointmentList = asyncHandler(async (req, res) => {
  const { requestedId, filter, Hospital } = req.body;
  if (!requestedId && filter) {
    throw new Error(" Requesting Id  or filter is missing!!");
  }
  if (!Hospital) {
    throw new Error("Hospital details not found");
  }
  try {
    const result = await Appointment.find(filter, { _id: 0 })
      .populate({
        path: "PatientID",
        model: patientData,
      })
      .populate({
        path: "DoctorID",
        model: consultants,
      });
    if (result == []) {
      throw new Error("No data found ");
    } else if (result) {
      const data = extractedData(result);

      res.status(200).json({
        acknowledged: true,
        data: data,
        token: generateToken(requestedId),
      });
    } else {
      throw new Error("Error while finding the patientData");
    }
  } catch (error) {
    res.status(500).json({
      acknowledged: false,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

const getDoctorList = asyncHandler(async (req, res, next) => {
  try {
    const { requestedId, filter, projection } = req.body;
    if (!requestedId && !filter && !projection) {
      throw new Error(" Requesting Id  or filter is missing!!");
    }
    if (!filter.Hospital) {
      throw new Error("Hospital details not found");
    }
    const DocList = await consultants.find(
      { filter },
      { _id: 0, EmployeeID: 0 }
    );
    if (!DocList) {
      throw new Error("No data found ");
    }
    return res.status(200).json({
      success: true,
      data: DocList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error :" + error,
    });
  }
});

const getCsvData = asyncHandler(async (req, res) => {
  const { requestedId, data } = req.body;
  if (!requestedId && !data) {
    throw new Error("Requesting Id, Data are required");
  }

  try {
    if (data.length === 0) {
      throw new Error("No data found");
    } else {
      const csvData = data.map((appointment) => {
        const csvItem = {};
        console.log(appointment);
        for (const key in appointment) {
          csvItem[key] = appointment[key];
        }
        return csvItem;
      });
      const csvStream = csv.format({ headers: true });
      const filePath = "appointments.csv";
      const writableStream = fs.createWriteStream(filePath);

      csvStream.pipe(writableStream);
      csvData.forEach((data) => csvStream.write(data));
      csvStream.end();

      writableStream.on("finish", () => {
        res.download(filePath, "appointments.csv", (err) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("An error occurred while downloading the CSV file");
          }
          fs.unlinkSync(filePath); // Delete the temporary CSV file after download
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      acknowledged: true,
      message: error.message,
      token: generateToken(requestedId),
    });
  }
});

module.exports = {
  getPatientData,
  getAppointmentList,
  availableDoctor,
  PatientWithAppointments,
  EmployeeData,
  ReqAppointmentsList,
  AppAppointmentsList,
  AllottedTimeSlots,
  WardenDetails,
  getDoctAppointmentDetails,
  getDoctorList,
  getHospitalList,
  getPatientIdList,
  getAppointmentDetail,
  getCsvData,
  consultedAppointments,
  appointmentList,
};
