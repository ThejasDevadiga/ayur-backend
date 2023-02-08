const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const {
    consultHome,
    AppointmentTable,
    PatientDetails,
    addPrescription
} = require('../../controller/consultant/consult')

router.get('/views/Consultant/consultant.pug',consultHome)
router.get('/views/Consultant/viewAppointment/:id',AppointmentTable)
router.get('/views/Consultant/patientDetails.pug',PatientDetails)
router.get('/views/Consultant/Prescribe.pug',addPrescription)

module.exports = router;
