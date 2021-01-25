const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const Message = require('../models/messageModel')
const uniqueid = require('uniqid')

exports.userCart = async (req, res) => {
  const { cart } = req.body

  let products = []

  const user = await User.findOne({ email: req.user.email }).exec()

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec()

  if (cartExistByThisUser) {
    cartExistByThisUser.remove()
    console.log('removed old cart')
  }

  for (let i = 0; i < cart.cart.length; i++) {
    let object = {}

    object.product = cart.cart[i]._id
    object.count = cart.cart[i].count

    // get price for creating total
    let { price } = await Product.findById(cart.cart[i]._id)
      .select('price')
      .exec()
    object.price = price

    products.push(object)
  }

  // console.log('products', products)

  let total = 0
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].price * products[i].count
  }

  let cartTotal

  if (cart.paymentMethod === '2') {
    cartTotal = Math.round((total + Number(cart.delivery)) * 1.05)
  } else {
    cartTotal = total + Number(cart.delivery)
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    deliveryPrice: cart.delivery,
    paymentMethod: cart.paymentMethod,
    orderdBy: user._id,
  }).save()

  console.log('new cart', newCart)
  res.json({ ok: true })
}

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()

    const cart = await Cart.findOne({ orderdBy: user._id })
      .populate('products.product', '_id name count price cartTotal images')
      .exec()

    const {
      products,
      count,
      price,
      cartTotal,
      deliveryPrice,
      paymentMethod,
    } = cart

    res.json({
      products,
      count,
      price,
      cartTotal,
      deliveryPrice,
      paymentMethod,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}

exports.emptyCart = async (req, res) => {
  console.log('empty cart')
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec()
  res.json({ ok: true })
}

exports.savePersonalInfo = async (req, res) => {
  try {
    const userInfo = await User.findOneAndUpdate(
      { email: req.user.email },
      { personalInfo: req.body.personalInfo }
    ).exec()

    return res.json({ ok: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Server error',
    })
  }
}

exports.createOrder = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec()

  let newOrder = await new Order({
    products: userCart.products,
    personalInfo: user.personalInfo,
    paymentInfo: {
      id: uniqueid(),
      amount: userCart.cartTotal,
      created: Date.now(),
      deliveryPrice: userCart.deliveryPrice,
      paymentMethod: userCart.paymentMethod,
    },

    orderdBy: user._id,
  }).save()

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }
  })

  let updated = await Product.bulkWrite(bulkOption, {})
  console.log('PRODUCT QUANTITY-- AND SOLD++', updated)

  console.log('NEW ORDER SAVED', newOrder)
  res.json(newOrder)
}

exports.readOrder = async (req, res) => {
  try {
    const id = req.params.id

    const order = await Order.findById(id)
      .populate('products.product')
      .populate('orderdBy')
      .exec()

    if (!order) {
      return res.status(400).json({ error: 'Order not found' })
    }

    if (order.orderdBy.email !== req.user.email) {
      return res
        .status(400)
        .json({ error: 'Access Denied order is not ordered by the user.' })
    }

    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}

exports.orders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate('products.product')
    .sort([['createdAt', 'desc']])
    .exec()

  if (!userOrders) {
    return res.status(400).json({ error: 'No orders found' })
  }

  res.json(userOrders)
}

exports.paypalPayment = async (req, res) => {
  try {
    const id = req.params.id

    const order = await Order.findByIdAndUpdate(
      id,
      { isPaid: req.body.isPaid },
      {
        new: true,
      }
    )
      .populate('products.product')
      .populate('orderdBy')
      .exec()

    if (!order) {
      return res.status(400).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}

exports.message = async (req, res) => {
  const { subject, message } = req.body
  if (!subject || !message) {
    return res.status(400).json({ error: 'All fields required' })
  }

  try {
    const user = await User.findOne({ email: req.user.email }).exec()

    const messagesCount = await Message.countDocuments({
      postedBy: user._id,
    })

    if (messagesCount >= 5) {
      return res.status(400).json({
        error:
          'You cannot post more than 5 messages, for any other help please contact us on whatsApp 054-665-9069',
      })
    }

    await new Message({
      subject,
      message,
      postedBy: user._id,
    }).save()

    res.status(201).json({ ok: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.readMessages = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const messages = await Message.find({ postedBy: user._id })
      .populate('postedBy', 'email')
      .sort([['createdAt', 'desc']])
      .exec()

    if (!messages) {
      res.status(400).json({ error: 'No messages found' })
    }
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
