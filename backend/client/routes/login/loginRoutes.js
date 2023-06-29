const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const {
    renderLogin,renderdefault
} = require('../../controller/login/login')

router.get('/views/login/login.pug',renderLogin)
router.get('/0',renderdefault)

module.exports = router;

console.log('https://ayur.vercel.app'+'/views/login/login.pug');
