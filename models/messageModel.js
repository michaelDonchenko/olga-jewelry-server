const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const messageSchema = new mongoose.Schema(
  {
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    subject: String,
    message: String,
    answer: { type: String, default: null },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
