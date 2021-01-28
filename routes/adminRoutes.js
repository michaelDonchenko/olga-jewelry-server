const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')

// controllers
const {
  orders,
  order,
  updateOrder,
  EditRules,
} = require('../controllers/adminControllers')

router.get('/admin/orders', authCheck, adminCheck, orders)
router.get('/admin/order/:id', authCheck, adminCheck, order)
router.put('/admin/order/:id', authCheck, adminCheck, updateOrder)
router.post('/admin/edit', authCheck, adminCheck, EditRules)

module.exports = router
