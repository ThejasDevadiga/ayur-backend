const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    consultHome
} = require('../../controller/consultant/consult')

router.get('/views/consultant/consultant.pug',consultHome)


module.exports = router;
