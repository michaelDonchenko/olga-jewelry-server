const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
} = require('../controllers/productControllers')

router.post('/product', authCheck, adminCheck, create)
router.delete('/product', authCheck, adminCheck, remove)
router.get('/product/:id', read)
router.put('/product/:id', authCheck, adminCheck, update)
router.post('/list-products', listAll)
router.post('/products', list)

module.exports = router
