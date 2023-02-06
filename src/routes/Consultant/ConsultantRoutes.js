const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')


const {
    PatientDetails,
    consultingPatientList
} = require('../../controllers/consultant/get')

const {
    makePrescription
} = require('../../controllers/consultant/post')
const {
    drugsList
} = require('../../controllers/drug/get')

router.get('/api/consultant/patient-details',PatientDetails)//Done
router.get('/api/consultant/get-consulting-patients',consultingPatientList)//Done//tested
router.post('/api/consultant/makePrescription',makePrescription)//Done
router.post('/api/consultant/drugs-list',drugsList)//Done
module.exports = router;
