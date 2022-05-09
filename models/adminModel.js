const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
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
  },
  confirmpassword: {
    type: String,
  },
});

module.exports = { adminSchema };
