const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')


const {
    getPatientDetails,
    consultingPatientList
} = require('../../controllers/consultant/conRead')

router.get('/api/consultant/patient-details',auth,getPatientDetails)//Done
router.get('/api/consultant/get-consulting-patients',auth,consultingPatientList)//Done//tested

module.exports = router;
