const Joi = require('joi')

const joiContactsShcemaAdd = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(3).required(),
})

const joiContactsShcemaUpd = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().optional(),
  phone: Joi.string().min(3).optional(),

})

module.exports = { joiContactsShcemaAdd, joiContactsShcemaUpd }
