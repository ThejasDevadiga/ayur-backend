const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const {
    renderLogin
} = require('../../controller/login/login')

router.get('/views/login/login.pug',renderLogin)

module.exports = router;

console.log(process.env.HOST+'/views/login/login.pug');
