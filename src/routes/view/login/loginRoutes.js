const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const {
    renderLogin
} = require('../../../controllers/view/login/login')

router.get('/views/login/login.html',renderLogin)


module.exports = router;
