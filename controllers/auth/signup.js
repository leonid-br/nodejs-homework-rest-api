const fs = require('fs/promises')
const path = require('path')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { Conflict } = require('http-errors')

const { sendMail } = require('../../utils')
const { User } = require('../../models')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const verifyToken = v4()

  const data = {
    to: email,
    subject: 'Подтверждение регистрации на сайте ',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердить регистрацию</a>`
  }
  await sendMail(data)

  const avatar = gravatar.url(email, { s: '100' }, true)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const result = await User.create({ email, password: hashPassword, avatarUrl: avatar, verifyToken })

  const id = result._id.toString()
  const dirPath = path.join(userDir, id)
  await fs.mkdir(dirPath)

  res.status(201).json({
    status: 'succes',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      link: `http://localhost:3000/api/users/verify/${verifyToken}`
    }
  })
}

module.exports = signup
