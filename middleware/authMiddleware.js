const admin = require('../firebase')
const User = require('../models/userModel')

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    // console.log('FIREBASE USER:', firebaseUser)
    req.user = firebaseUser
    next()
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .json({
        error: 'Invalid or expired token, Refresh the page and try again ',
      })
  }
}

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user

  const adminUser = await User.findOne({ email }).exec()

  if (adminUser.role !== 'admin') {
    res.status(403).json({ error: 'Admin resource. Access denied.' })
  } else {
    next()
  }
}
