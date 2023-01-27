const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    receptHome
} = require('../../controller/receptionist/recept')

router.get('/views/Receptionist/receptionist.pug',receptHome)


module.exports = router;
