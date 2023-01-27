const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    managerHome
} = require('../../controller/manager/manager')

router.get('/views/Manager/manager.pug',managerHome)


module.exports = router;
