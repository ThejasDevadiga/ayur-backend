const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const {
  wardenHome,
  patientHistory,
} = require("../../controller/warden/warden");
const {
  patientAddmission,
  bookAppointment,
  preAppointment,
} = require("../../controller/receptionist/recept");
router.get("/views/Warden/warden.pug", wardenHome);
router.get("/views/Warden/make-registration", patientAddmission);
// router.get("/views/Warden/preAppointment.pug", preAppointment);
// router.get('/views/Warden/make-appointment',bookAppointment);
router.get("/views/Warden/patient-history", patientHistory);
router.get("/views/warden/book-appointment/:pid&:name", bookAppointment);

console.log("https://ayur.vercel.app/views/Warden/warden.pug");
console.log("https://ayur.vercel.app/views/Warden/patient-history");

module.exports = router;
