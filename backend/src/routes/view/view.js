const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')

const {openWindow} = require('../../views/TEST/JS/test')
 
router.post('/',openWindow)


module.exports = router