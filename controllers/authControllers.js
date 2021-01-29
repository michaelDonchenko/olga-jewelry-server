const User = require('../models/userModel')

exports.createUser = async (req, res) => {
  const { email } = req.user
  try {
    const userExist = await User.findOne({ email: email })

    if (userExist) {
      return res.status(400).json({
        error:
          'User with that email already exist, if you forgot your password you can reset it on reset password page.',
      })
    } else {
      const newUser = await new User({
        email,
      }).save()
      res.json(newUser)
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

exports.login = async (req, res) => {
  try {
    await User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ error: 'Could not login.' })
      }
      res.json(user)
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server Error' })
  }
}

exports.googleLogin = async (req, res) => {
  const { email } = req.user

  try {
    const userExist = await User.findOne({ email: email })

    if (userExist) {
      return res.status(200).json(userExist)
    } else {
      const newUser = await new User({
        email,
      }).save()
      res.json(newUser)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server Error' })
  }
}
