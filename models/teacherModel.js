const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      max: 30,
      min: 6,
      required: true,
    },
    confirmpassword: {
      type: String,
      select: false,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.methods.joiValidate = (obj) => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lasttname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirmPassword: Joi.ref("password"),
    admin_id: Joi.string(),
  });
  return Joi.validate(obj, schema);
};
//Pre-save method for password hashing
teacherSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.model("Teacher", teacherSchema);
