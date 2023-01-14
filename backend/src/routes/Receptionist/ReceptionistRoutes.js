const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();
const {
    getPatientData
} = require('../../controllers/Receptionist/receptionsRead')
const {
    updatePatientData
}= require('../../controllers/Receptionist/receptionsUpdate')
const {
    deletePatientData
}= require('../../controllers/Receptionist/receptionsDelete')
const {
    insertPatientData
}= require('../../controllers/Receptionist/receptionsInsert')
const {
    availableDoctor,
    getEmployeesData,
} = require('../../controllers/Receptionist/receptionsRead')

router.get('/api/manager/get-patient-details',getPatientData)//Done//tested
router.put('/api/manager/update-patient-details',updatePatientData)//Done//tested  
router.delete('/api/manager/delete-patient-details',deletePatientData)//Done//tested
router.post('/api/manager/insert-patient-details',insertPatientData)//Done//tested
router.post('/api/Receptionist/available-doctor', availableDoctor)//Done
router.get('/api/Receptionist/get-Employees-Data', getEmployeesData)//Done


module.exports = router;
