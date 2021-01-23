const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const messageSchema = new mongoose.Schema(
  {
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
