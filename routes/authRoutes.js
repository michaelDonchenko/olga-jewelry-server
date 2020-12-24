const express = require('express')
const router = express.Router()
const { createUser, login } = require('../controllers/authControllers')
const { authCheck } = require('../middleware/authMiddleware')

router.post('/create-user', authCheck, createUser)
router.post('/login', authCheck, login)

module.exports = router
