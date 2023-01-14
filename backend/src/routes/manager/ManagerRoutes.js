const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();

const {
    deleteEmployeeData

} = require('../../controllers/manager/manDelete')

const {
    insertEmployeeData
} = require('../../controllers/manager/manInsert')


const {
    getEmployeeData,
} = require('../../controllers/manager/manRead')

const {
    updateEmployeeData
} = require('../../controllers/manager/manUpdate')
const {
    getPatientData
} = require('../../controllers/Receptionist/receptionsRead')
const {
    updatePatientData
}= require('../../controllers/Receptionist/receptionsUpdate')
const {
    deletePatientData
}= require('../../controllers/Receptionist/receptionsDelete')

router.get('/api/manager/get-patient-details',getPatientData)//Done//tested
router.put('/api/manager/update-patient-details',updatePatientData)//Done//tested  
router.delete('/api/manager/delete-patient-details',deletePatientData)//Done//tested
router.post('/api/manager/insert-employee-details',insertEmployeeData)//Done//tested
router.put('/api/manager/update-employee-details',updateEmployeeData)//Done//tested
router.delete('/api/manager/delete-employee-details',deleteEmployeeData)//Done//tested
router.get('/api/manager/get-employee-details',getEmployeeData)//Done//tested
module.exports = router;
