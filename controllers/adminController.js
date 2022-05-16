const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admins = require("../models/adminModel");
const { registerSchema, loginSchema } = require("../helpers/auth");
const secret = process.env.SECRET_KEY;
const {
  adminExistError,
  adminSuccess,
  adminRemove,
  addError,
  adminNotFound,
  invalidCredentials,
} = require("../helpers/apiError");

// get all admin information
const adminList = async (req, res) => {
  try {
    const list = await admins.find();
    res.status(200).json({ list });
  } catch (e) {
    res.status(404).json({ adminNotFound });
  }
};

// get admin information by id

const adminById = async (req, res) => {
  try {
    const list = await admins.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(404).json({ adminNotFound });
  }
};

// adding admin information
const adminAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const result = await registerSchema.validateAsync(req.body);
    const adminExist = await admins.findOne({ email: result.email });
    if (adminExist) {
      res.status(400).json({ adminExistError });
    } else {
      const admin = await new admins({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
      });
      await admin.save();
      res.status(200).send(adminSuccess);
    }
  } catch (error) {
    res.status(401).json(addError);
  }
};

// updating admin information
const adminUpdate = async (req, res) => {
  try {
    const admin = await admins.findById(req.params.id);
    Object.assign(admin, req.body);
    await admin.save();
    res.status(200).json(adminSuccess);
  } catch (error) {
    res.status(401).json(addError);
  }
};

// removing admin information
const adminDelete = async (req, res) => {
  try {
    await admins.findByIdAndRemove(req.params.id);
    res.status(200).json(adminRemove);
  } catch (error) {
    res.status(404).json(adminNotFound);
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
        res.status(404).json(invalidCredentials);
      } else {
        const payload = { email };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        res.status(200).json({ token });
      }
    } else {
      res.status(404).json({ adminNotFound });
    }
  } catch (error) {
    res.status(404).json(adminNotFound);
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
