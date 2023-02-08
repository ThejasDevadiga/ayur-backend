const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {
  receptHome,
  PatientDetails,
  AppointmentTable,
  DoctorDetails,
  patientAddmission,
  bookAppointment,
  preAppointment,
} = require("../../controller/receptionist/recept");

router.get("/views/Receptionist/receptionist.pug", receptHome);
router.get("/views/Receptionist/patientDetails.pug", PatientDetails);
router.get("/views/Receptionist/doctorDetails.pug", DoctorDetails);
router.get("/views/Receptionist/viewAppointment/:id", AppointmentTable);
router.get("/views/Receptionist/admission-patient.pug", patientAddmission);
router.get("/views/Receptionist/book-appointment/:pid&:name", bookAppointment);
router.get("/views/Receptionist/preAppointment.pug", preAppointment);
module.exports = router;
