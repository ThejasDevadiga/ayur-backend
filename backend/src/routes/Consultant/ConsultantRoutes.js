const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')
 
const {
    
    TodaysAppointments,patientAppointments,getVitalsDetails
} = require('../../controllers/consultant/get')

const {
    makePrescription,uploadVitalsDetails, 
} = require('../../controllers/consultant/post')
const {
    drugsList
} = require('../../controllers/drug/get')

// router.get('/api/consultant/patient-details',PatientDetails)//Done
/* These are routes being defined for a Node.js/Express.js application. Each route corresponds to a
specific endpoint that the application will handle. */
router.post('/api/consultant/makePrescription',makePrescription)//Done
router.post('/api/consultant/drugs-list',drugsList)//Done
router.post('/api/consultant/todays-doctor-appointments',TodaysAppointments)
router.post('/api/consultant/patient-Appointments',patientAppointments)
router.post('/api/consultant/get-vitals-details',getVitalsDetails)
router.post('/api/consultant/upload-vitals-data',uploadVitalsDetails)
  
module.exports = router;
