const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admins = require("../models/adminModel");
const { registerSchema, loginSchema } = require("../helpers/adminAuth");
const secret = process.env.SECRET_KEY;

// get all admin information
const adminList = async (req, res) => {
  try {
    const list = await admins.find();
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// get admin information by id
const adminById = async (req, res) => {
  try {
    const list = await admins.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// adding admin information
const adminAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const result = await registerSchema.validateAsync(req.body);
    const adminExist = await admins.findOne({ email: result.email });
    if (adminExist) {
      throw console.error("user exist");
    }

    const admin = await new admins({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    });
    await admin.save();
    res.status(200).send(admin);
  } catch (error) {
    res.status(400).json({ meesage: "An error occured: " + error });
  }
};

// updating admin information
const adminUpdate = async (req, res) => {
  try {
    const admin = await admins.findById(req.params.id);
    Object.assign(admin, req.body);
    await admin.save();
    console.log(req.body);
    res.status(200).json({ Message: "Admin details updated successfully" });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// removing admin information
const adminDelete = async (req, res) => {
  try {
    await admins.findByIdAndRemove(req.params.id);
    res.status(200).json({ Message: "Admin removed successfully." });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginSchema.validateAsync(req.body);
    const adminLogin = await admins.findOne({ email: result.email });
    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      if (!isMatch) {
        res.status(404).json({ Message: "Please enter correct credentials" });
      } else {
        const payload = { email };
        const token = jwt.sign(payload, secret);
        res.status(200).json({ token });
      }
    } else {
      res.status(405).json({ Message: "Please enter correct credentials" });
    }
  } catch (e) {
    res.status(400).json({ message: "An error occured : " + e });
  }
};

module.exports = {
  adminList,
  adminById,
  adminAdd,
  adminUpdate,
  adminDelete,
  adminLogin,
};
