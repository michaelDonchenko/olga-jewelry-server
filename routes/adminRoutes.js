const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')

// controllers
const {
  orders,
  order,
  updateOrder,
  readMessages,
  messageAnswer,
} = require('../controllers/adminControllers')

router.get('/admin/orders', authCheck, adminCheck, orders)
router.get('/admin/order/:id', authCheck, adminCheck, order)
router.put('/admin/order/:id', authCheck, adminCheck, updateOrder)
router.get('/admin/messages', authCheck, adminCheck, readMessages)
router.put('/admin/messageAnswer/:id', authCheck, adminCheck, messageAnswer)

module.exports = router
