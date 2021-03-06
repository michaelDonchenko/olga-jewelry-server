const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    const { name } = req.body

    if (name.length < 2 || name.length > 64) {
      return res
        .status(400)
        .json({ error: 'Name has to be between 2 and 64 characters' })
    }

    const categoryExist = await Category.findOne({ name: name }).exec()
    if (categoryExist) {
      return res.status(400).json({ error: 'Category name has to be unique' })
    }

    const category = await new Category({ name, slug: slugify(name) }).save()
    res.status(201).json(category)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error })
  }
}

exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec())

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec()

  const pageSize = req.query.pageSize || 8
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments({ category: category._id })

  const products = await Product.find({ category: category._id })
    .limit(parseInt(pageSize))
    .skip(pageSize * (page - 1))
    .populate('category')
    .exec()

  res.json({
    category,
    products,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize: pageSize,
  })
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
