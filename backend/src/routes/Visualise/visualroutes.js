const express = require('express');
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')

const {patientcounts} = require('../../controllers/visualise/patientCount')
router.post('/api/visualise/patient-count',patientcounts)

module.exports = router;
