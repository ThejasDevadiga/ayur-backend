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

router.get('/api/manager/get-patient-details',auth,getPatientData)//Done//tested
router.put('/api/manager/update-patient-details',auth,updatePatientData)//Done//tested  
router.delete('/api/manager/delete-patient-details',auth,deletePatientData)//Done//tested
router.post('/api/manager/insert-patient-details',auth,insertPatientData)//Done//tested
router.get('/api/Receptionist/available-doctor',auth, availableDoctor)//Done
router.get('/api/Receptionist/get-Employees-Data',auth, getEmployeesData)//Done


module.exports = router;
