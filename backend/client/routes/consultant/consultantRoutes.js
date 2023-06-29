const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const {
  consultHome,
  AppointmentTable,
  addPrescription,
  PatientDetails,
  examinDate,
  reportPage,
} = require("../../controller/consultant/consult");

const { drugDetails } = require("../../controller/manager/manager");

router.get("/views/Consultant/consultant.pug", consultHome);
// router.get('/views/Consultant/viewAppointment/:date&:docId',AppointmentTable)
router.get("/views/Consultant/patientDetails.pug", PatientDetails);
router.get("/views/Consultant/Prescribe/:id", addPrescription);
router.get("/views/Consultant/report/:id", reportPage);
router.get("/views/Consultant/drug-details", drugDetails);
router.get("/views/Consultant/examin/:patid&:aptid", examinDate);
console.log("https://ayur.vercel.app" + "/views/Consultant/consultant.pug");
// console.log('https://ayur.vercel.app'+'/views/Consultant/examin.pug');
// console.log('https://ayur.vercel.app'+'/views/Consultant/patientDetails.pug');

module.exports = router;
