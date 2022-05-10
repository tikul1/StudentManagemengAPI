const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
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
    },
    confirmpassword: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
confirmpassword = undefined;
module.exports = mongoose.model("Admin", adminSchema);
