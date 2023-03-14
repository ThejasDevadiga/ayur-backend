const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();


const {
    MakeAppointment,
} = require('../../controllers/wardens/post')
const {wardensAppointments} = require('../../controllers/wardens/get')

router.post('/api/warden/available-doctor', MakeAppointment) 
router.post('/api/warden/wardens-appointment',wardensAppointments)
module.exports = router;
