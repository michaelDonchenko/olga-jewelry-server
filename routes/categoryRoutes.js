const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')

// controller
const {
  create,
  read,
  remove,
  list,
} = require('../controllers/categoryControllers')

// routes
router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', authCheck, adminCheck, remove)

module.exports = router
