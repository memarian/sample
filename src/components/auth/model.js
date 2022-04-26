const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const veirfySchema = new mongoose.Schema(
  {
    code: { type: Number, required: true, minlength: 4, maxlength: 4 },
    ip: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Verify = mongoose.model('Verify', veirfySchema);
function validateMobile(data) {
  const schema = Joi.object({
    mobile: Joi.string()
      .regex(/^(\+98|0)?9\d{9}$/)
      .message('invalid number'),
  });
  return schema.validate(data);
}

function validateCode(data) {
  const schema = Joi.object({
    code: Joi.number().required(),
    mobile: Joi.string()
      .required()
      .regex(/^(\+98|0)?9\d{9}$/)
      .message('invalid number'),
  });

  return schema.validate(data);
}

module.exports.verifyModel = Verify;
module.exports.validateCode = validateCode;
module.exports.validateMobile = validateMobile;
