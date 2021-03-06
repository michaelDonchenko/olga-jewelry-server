const Order = require('../models/orderModel')
const SiteRule = require('../models/siteRuleModel')

exports.orders = async (req, res) => {
  //pagination variables
  const pageSize = req.query.pageSize || 8
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.estimatedDocumentCount({})

  try {
    let orders = await Order.find()
      .limit(parseInt(pageSize))
      .skip(pageSize * (page - 1))
      .populate('products.product')
      .sort([['createdAt', 'desc']])
      .exec()

    if (!orders) {
      return res.status(400).json({ error: 'No orders found' })
    }
    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      pageSize: pageSize,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Server error',
    })
  }
}

exports.order = async (req, res) => {
  const id = req.params.id
  try {
    const order = await Order.findById(id)
      .populate('products.product')
      .populate('orderdBy')
      .exec()

    if (!order) {
      return res.status(400).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Server error',
    })
  }
}

exports.updateOrder = async (req, res) => {
  const { isPaid, orderStatus, trackNumber, url } = req.body
  const id = req.params.id

  try {
    const updated = await Order.findByIdAndUpdate(
      id,
      {
        isPaid,
        orderStatus,
        trackNumber,
        url,
      },
      { new: true }
    )
      .populate('products.product')
      .populate('orderdBy')
      .exec()

    if (updated) {
      return res.status(201).json(updated)
    }
    return res.status(400).json({ error: 'Could not update the order.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.EditRules = async (req, res) => {
  const { value } = req.body
  try {
    const ruleExist = await SiteRule.findOne().exec()

    if (ruleExist) {
      await SiteRule.findOneAndUpdate({
        rule: value,
      }).exec()

      return res.status(201).json({ msg: 'rules updated' })
    }

    if (!ruleExist) {
      const newRule = await new SiteRule({
        rule: value,
      }).save()

      return res.status(201).json({ msg: 'rules created', newRule })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
