const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();
const {
    getPatientData,PatientWithAppointments
} = require('../../controllers/Receptionist/get')
const {
    updatePatientData
}= require('../../controllers/Receptionist/put')
const {
    deletePatientData
}= require('../../controllers/Receptionist/delete')
const {
    AddPatientData,makeAppointment,
}= require('../../controllers/Receptionist/post')
const {
    availableDoctor,
} = require('../../controllers/Receptionist/get')

router.get('/api/Receptionist/get-patient-details',getPatientData)//Done//tested
router.put('/api/Receptionist/update-patient-details',updatePatientData)//Done//tested  
router.delete('/api/Receptionist/delete-patient-details',deletePatientData)//Done//tested
router.post('/api/Receptionist/insert-patient-details',AddPatientData)//Done//tested
router.post('/api/Receptionist/available-doctor', availableDoctor)//Done
router.post('/api/Receptionist/make-Appointments', makeAppointment)//Done
router.post('/api/Receptionist/patient-AppointmentList',PatientWithAppointments)
module.exports = router;
