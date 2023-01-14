const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')


const {
    getPatientDetails,
    consultingPatientList
} = require('../../controllers/consultant/conRead')

router.get('/api/consultant/patient-details',getPatientDetails)//Done
router.get('/api/consultant/get-consulting-patients',consultingPatientList)//Done//tested

module.exports = router;
