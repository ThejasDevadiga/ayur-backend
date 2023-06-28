const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();
const {
    getPatientData,PatientWithAppointments,AllottedTimeSlots,getHospitalList,getPatientIdList,getCsvData
} = require('../../controllers/Receptionist/get')
const {
    updatePatientData,appointmentStatus,updateAppointmentDoctor
}= require('../../controllers/Receptionist/put')
const {
    deletePatientData
}= require('../../controllers/Receptionist/delete')
const {
    AddPatientData,makeAppointment,
}= require('../../controllers/Receptionist/post')
const {
    availableDoctor,getDoctAppointmentDetails,getAppointmentDetail,getAppointmentList,consultedAppointments,ReqAppointmentsList,AppAppointmentsList,getDoctorList,appointmentList
} = require('../../controllers/Receptionist/get')
const {
    DepartmentsList
} = require('../../controllers/departments/get')

router.post('/api/Receptionist/get-patient-details',getPatientData)//Done//tested
router.put('/api/Receptionist/update-patient-details',updatePatientData)//Done//tested 
router.put('/api/Receptionist/update-appointment-doctor',updateAppointmentDoctor)
router.delete('/api/Receptionist/delete-patient-details',deletePatientData)//Done//tested
router.post('/api/Receptionist/insert-patient-details',AddPatientData)//Done//tested
router.post('/api/Receptionist/available-doctor', availableDoctor)//Done
router.post('/api/Receptionist/make-Appointments', makeAppointment)//Done
router.post('/api/Receptionist/patient-AppointmentList',PatientWithAppointments)
router.post('/api/Receptionist/allotted-Timeslots',AllottedTimeSlots)
router.post('/api/Receptionist/department-list',DepartmentsList)
router.post('/api/Receptionist/get-appointment-details',getDoctAppointmentDetails)
router.post('/api/Receptionist/get-appointment-detail',getAppointmentDetail)
router.post('/api/Receptionist/get-appointment-list',getAppointmentList)
router.post('/api/Receptionist/consulted-appointments',consultedAppointments)
router.post('/api/Receptionist/req-appointment-list',ReqAppointmentsList)
router.post('/api/Receptionist/app-appointment-list',AppAppointmentsList)
router.put('/api/Receptionist/update-appointment-status',appointmentStatus)
router.post('/api/Receptionist/get-patientid-list',getPatientIdList)
router.post('/api/Receptionist/get-doctor-list',getDoctorList)
router.post('/api/Receptionist/get-hospital-list',getHospitalList)
router.post('/api/admin/getCsvFile',getCsvData)
router.post("/api/Receptionist/appointment-list",appointmentList)

module.exports = router;
