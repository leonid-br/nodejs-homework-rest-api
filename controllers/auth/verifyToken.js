const { NotFound } = require('http-errors')

const { User } = require('../../models')

const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw new NotFound('User not found')
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null })
  res.send(`<h2>Email ${user.email} подтвержден</h2>`)
}

module.exports = verifyToken
