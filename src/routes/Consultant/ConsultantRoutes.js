const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')


const {
    PatientDetails,
    consultingPatientList
} = require('../../controllers/consultant/get')

router.get('/api/consultant/patient-details',PatientDetails)//Done
router.get('/api/consultant/get-consulting-patients',consultingPatientList)//Done//tested

module.exports = router;
