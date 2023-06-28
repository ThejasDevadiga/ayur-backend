const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    adminHome
} = require('../../controller/admin/admin')

router.get('/views/Admin/admin.pug',adminHome)


module.exports = router;
