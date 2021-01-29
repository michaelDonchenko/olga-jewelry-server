const express = require('express')
const router = express.Router()
const {
  createUser,
  login,
  googleLogin,
} = require('../controllers/authControllers')
const { authCheck } = require('../middleware/authMiddleware')

router.post('/create-user', authCheck, createUser)
router.post('/login', authCheck, login)
router.post('/googleLogin', authCheck, googleLogin)

module.exports = router
