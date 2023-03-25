const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')


const {
    PatientDetails,
    TodaysAppointments,patientAppointments
} = require('../../controllers/consultant/get')

const {
    makePrescription,
} = require('../../controllers/consultant/post')
const {
    drugsList
} = require('../../controllers/drug/get')

router.get('/api/consultant/patient-details',PatientDetails)//Done
router.post('/api/consultant/makePrescription',makePrescription)//Done
router.post('/api/consultant/drugs-list',drugsList)//Done
router.post('/api/consultant/todays-doctor-appointments',TodaysAppointments)
router.post('/api/consultant/patient-Appointments',patientAppointments)
module.exports = router;
