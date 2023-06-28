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
  preSchedule,updateAppointment,profilePage,csvFileDownloaderPage,appointmentsList
} = require("../../controller/receptionist/recept");

router.get("/views/Receptionist/receptionist.pug", receptHome);
router.get("/views/Receptionist/patientDetails.pug", PatientDetails);
router.get("/views/Receptionist/doctorDetails.pug", DoctorDetails);
router.get("/views/Receptionist/viewAppointment/:date&:docId", AppointmentTable);
router.get("/views/Receptionist/admission-patient.pug", patientAddmission);
router.get("/views/Receptionist/book-appointment/:pid&:name", bookAppointment);
router.get("/views/Receptionist/preAppointment.pug", preAppointment);
router.get("/views/Receptionist/preSchedule.pug", preSchedule);
router.get("/views/Receptionist/updateAppointment",updateAppointment)
router.get("/views/patient-profile/:id",profilePage)
router.get("/views/download-file.pug",csvFileDownloaderPage)
router.get("/views/Receptionist/appointmentsList.pug",appointmentsList)

module.exports = router;
console.log(process.env.HOST+'/views/Receptionist/receptionist.pug');
