const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')
 
const {
    PatientDetails,
    TodaysAppointments,patientAppointments,getVitalsDetails
} = require('../../controllers/consultant/get')

const {
    makePrescription,uploadVitalsDetails, 
} = require('../../controllers/consultant/post')
const {
    drugsList
} = require('../../controllers/drug/get')

router.get('/api/consultant/patient-details',PatientDetails)//Done
router.post('/api/consultant/makePrescription',makePrescription)//Done
router.post('/api/consultant/drugs-list',drugsList)//Done
router.post('/api/consultant/todays-doctor-appointments',TodaysAppointments)
router.post('/api/consultant/patient-Appointments',patientAppointments)
router.post('/api/consultant/get-vitals-details',getVitalsDetails)
router.post('/api/consultant/upload-vitals-data',uploadVitalsDetails)
  
module.exports = router;
