const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')

const {validateUser,insertUser} = require('../../controllers/user/post')
const { updatePassword,logOutUser } = require('../../controllers/user/put')

router.post('/api/user/validate-user',validateUser)
router.post('/api/user/Insert-user',insertUser)
router.put('/api/user/update-password',updatePassword)
router.post('/api/user/logOut-user',logOutUser)
module.exports = router