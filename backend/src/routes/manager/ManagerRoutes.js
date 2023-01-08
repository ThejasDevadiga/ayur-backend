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

router.post('/api/manager/get-patient-details',auth,getPatientData)//Done//tested
router.put('/api/manager/update-patient-details',auth,updatePatientData)//Done//tested  
router.delete('/api/manager/delete-patient-details',auth,deletePatientData)//Done//tested
router.post('/api/manager/insert-employee-details',auth,insertEmployeeData)//Done//tested
router.put('/api/manager/update-employee-details',auth,updateEmployeeData)//Done//tested
router.delete('/api/manager/delete-employee-details',auth,deleteEmployeeData)//Done//tested
router.get('/api/manager/get-employee-details',auth,getEmployeeData)//Done//tested
module.exports = router;
