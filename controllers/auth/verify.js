const { BadRequest } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../utils')

const verify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('Missing required field email')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new BadRequest('Email is wrong')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const data = {
    to: email,
    subject: 'Подтверждение регистрации на сайте ',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}"> Подтвердить регистрацию</a>`
  }
  await sendMail(data)

  res.json({
    status: 'succes',
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
      link: `http://localhost:3000/api/users/verify/${user.verifyToken}`
    }
  })
}

module.exports = verify
