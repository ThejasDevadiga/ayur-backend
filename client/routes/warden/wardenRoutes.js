const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    wardenHome
} = require('../../controller/warden/warden')

router.get('/views/Warden/warden.pug',wardenHome)


module.exports = router;
