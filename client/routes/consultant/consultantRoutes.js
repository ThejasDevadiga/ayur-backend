const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const {
    consultHome,
    AppointmentTable,
    addPrescription
} = require('../../controller/consultant/consult')
const {
    PatientDetails,
   
  } = require("../../controller/receptionist/recept");

const {
    drugDetails
} = require('../../controller/manager/manager')

router.get('/views/Consultant/consultant.pug',consultHome)
router.get('/views/Consultant/viewAppointment/:date&:docId',AppointmentTable)
router.get('/views/Consultant/patientDetails.pug',PatientDetails)
router.get('/views/Consultant/Prescribe.pug',addPrescription)
router.get('/views/Consultant/drug-details',drugDetails)

console.log(process.env.HOST+'/views/Consultant/consultant.pug');
// console.log(process.env.HOST+'/views/Consultant/Prescribe.pug');
// console.log(process.env.HOST+'/views/Consultant/patientDetails.pug');

module.exports = router;
