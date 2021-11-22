const sgMail = require('@sendgrid/mail')
const { InternalServerError } = require('http-errors')

const sendMail = async data => {
  const { SENDGRID_API_KEY } = process.env
  sgMail.setApiKey(SENDGRID_API_KEY)

  try {
    const mail = { ...data, from: 'leonid.bry@gmail.com' }
    await sgMail.send(mail)
    return true
  } catch (error) {
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
