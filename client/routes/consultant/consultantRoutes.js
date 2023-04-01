const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const {
    consultHome,
    AppointmentTable,
    addPrescription,
    PatientDetails,examinDate
} = require('../../controller/consultant/consult')

const {
    drugDetails
} = require('../../controller/manager/manager')

router.get('/views/Consultant/consultant.pug',consultHome)
// router.get('/views/Consultant/viewAppointment/:date&:docId',AppointmentTable)
router.get('/views/Consultant/patientDetails.pug',PatientDetails)
router.get('/views/Consultant/Prescribe/:id',addPrescription)
router.get('/views/Consultant/drug-details',drugDetails)
router.get('/views/Consultant/examin/:patid&:aptid',examinDate )
console.log(process.env.HOST+'/views/Consultant/consultant.pug');
// console.log(process.env.HOST+'/views/Consultant/examin.pug');
// console.log(process.env.HOST+'/views/Consultant/patientDetails.pug');

module.exports = router;
