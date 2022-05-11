const joi = require("joi");

const registerSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmpassword: joi.ref("password"),
  firstname: joi.string().min(3).max(30).required(),
  lastname: joi.string().min(3).max(30).required(),
  admin_id: joi.string(),
});

const studentRegisterSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  firstname: joi.string().min(3).max(30).required(),
  lastname: joi.string().min(3).max(30).required(),
  teacher_id: joi.string(),
});

const loginSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = { registerSchema, loginSchema, studentRegisterSchema };
