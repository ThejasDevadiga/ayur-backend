const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const {
  managerHome,
  drugDetails,
} = require("../../controller/manager/manager");

const {
  PatientDetails,
  preAppointment,
  patientAddmission,
  AppointmentTable,
  bookAppointment,
} = require("../../controller/receptionist/recept");

router.get("/views/Manager/manager.pug", managerHome);
router.get("/views/Manager/patient-details.pug", PatientDetails);
router.get("/views/Manager/pre-appointment.pug", preAppointment);
router.get("/views/Manager/patient-addmission", patientAddmission);
router.get("/views/Manager/viewAppointment/:date&:docId", AppointmentTable);
router.get("/views/Manager/book-appointment/:pid&:name", bookAppointment);
router.get("/views/Manager/drug-details", drugDetails);
module.exports = router;
console.log("https://ayur.vercel.app" + "/views/Manager/manager.pug");
