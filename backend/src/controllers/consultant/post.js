const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Prescriptions = require("../../models/Consultant/prescriptions");
const PatientShema = require("../../models/Patient/PatientDataSchema");
const EmployeeSchema = require("../../models/Employee/EmployeeDataScheme");
const Vitals = require("../../models/Receptionist/patientVitals");
const Appointment = require("../../models/Receptionist/Appointments");
const Consultants = require("../../models/Consultant/consultantList");
const makePrescription = asyncHandler(async (req, res, next) => {
  try {
    const {
      requestedId,
      patientId,
      consultantId,
      AppointmentId,
      drugList,
      prescriptions,
      Hospital,
    } = req.body;

    const PrescriptionID = generateId("PRESC");
    if (
      !requestedId ||
      !PrescriptionID ||
      !patientId ||
      !consultantId ||
      !AppointmentId
    ) {
      throw new Error("Required fields missing");
    }
    if (!Hospital) {
      throw new Error("Hospital details not found");
    }

    const patientResult = await PatientShema.findOne(
      { PatientID: patientId },
      { _id: 1 }
    );
    if (!patientResult) {
      throw new Error("Patient details not found!");
    }
    const patientID = patientResult._id;
    
    const appointmentRes = await Appointment.findOne(
      {
        AppointmentID: AppointmentId,
      },
      { DoctorID: 1, _id: 1 }
    );

   
    if (!appointmentRes) {
      throw new Error("doctor details not found!");
    }
    const consultantID = appointmentRes.DoctorID;

    const AppointmentID = appointmentRes._id;

    const newPrescription = await Prescriptions.create({
      PrescriptionID,
      patientID,
      consultantID,
      AppointmentID,
      drugList,
      prescriptions,
    });

    if (!newPrescription) {
      throw new Error("Error while adding data");
    }
    
    const Updatedappointment = await Appointment.updateOne(
      {
        AppointmentID: AppointmentId,
      },
      {
        $set: {
          PrescriptionID: newPrescription._id,
          Status:"CONSULTED"
        },
      }
    );
   
    if (!Updatedappointment) {
      throw new Error("Error while updating appointment");
    }
    
    
    res.status(200).json({
      acknowledged: true,
      message: "Prescription data added successfully",
    });
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: err.message,
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
    const Hospital = req.body.Hospital;
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
      Hospital,
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
      data: {
        vitalID: result._id,
        temperature,
        weight,
        height,
        pulse,
        bloodPressure,
        respiratoryRate,
      },
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

// const LabPreRequisition = asyncHandler(async (req, res, next) => {

//   try {
//     const {
//       requestedId,
//       AppointmentID,
//       heamoglobin,
//       wbcCount,
//       diffCount,
//       esr,
//       plateletCount,
//       mp,
//       microbial,
//       widal,
//       dengue,
//       crp,
//     bloodPressure,
//     rbs,
//     minilft
//     } = req.body;

//   }
//   catch{
//   }
// })

module.exports = {
  makePrescription,
  uploadVitalsDetails,
};
