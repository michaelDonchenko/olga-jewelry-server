const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
      },
    ],
    paymentInfo: {},
    personalInfo: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: ['Not Processed', 'Processing', 'Cancelled', 'Delivered'],
    },
    orderdBy: { type: ObjectId, ref: 'User' },
    isPaid: {
      type: Boolean,
      default: false,
    },
    trackNumber: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
