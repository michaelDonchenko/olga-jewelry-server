const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

exports.create = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    quantity,
    images,
  } = req.body.values
  try {
    const productExist = await Product.findOne({ name: name }).exec()
    if (productExist) {
      return res.status(400).json({ error: 'Product name has to be unique' })
    }

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (images.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one image' })
    }

    const product = await new Product({
      name,
      description,
      price,
      category,
      quantity,
      images,
    }).save()
    res.status(201).json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error })
  }
}

exports.listAll = async (req, res) => {
  //pagination variables
  const pageSize = req.query.pageSize || 8
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.estimatedDocumentCount({})

  //filter varialbles
  const sort = req.body.sort || 'createdAt'
  const order = req.body.order || -1

  try {
    const products = await Product.find({})
      .limit(parseInt(pageSize))
      .skip(pageSize * (page - 1))
      .populate('category')
      .sort([[sort, Number(order)]])

    if (!products) {
      return res.status(400).json({
        error: 'Could not find products',
      })
    }
    res.json({
      products,
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

exports.remove = async (req, res) => {
  const { id } = req.body
  try {
    const removed = await Product.findByIdAndDelete(id)
    if (!removed) {
      return res.status(400).json({
        error: 'Could not delete the product',
      })
    }
    res.json(removed)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'server error' })
  }
}

exports.read = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findById(id).populate('category').exec()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'server error' })
  }
}

exports.update = async (req, res) => {
  let id = req.params.id
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec()
    res.json(updated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'server error' })
  }
}

//without pagination
exports.list = async (req, res) => {
  try {
    //createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body
    const products = await Product.find()
      .populate('category')
      .sort([[sort, order]])
      .limit(limit)
      .exec()

    res.json(products)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
