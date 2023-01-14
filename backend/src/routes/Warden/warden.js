const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
const auth = require('../../middlewares/authMiddleware')
dotenv.config();


const {
    MakeAppointment,
} = require('../../controllers/wardens/wardenInsert')

router.post('/api/Receptionist/available-doctor', MakeAppointment)//Done

module.exports = router;
