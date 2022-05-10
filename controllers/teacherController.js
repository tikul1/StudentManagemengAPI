const teachers = require("../models/teacherModel");
const bcrypt = require("bcryptjs");
const { registerSchema, loginSchema } = require("../helpers/auth");
const { initializingPassport } = require("../helpers/teacherPassport");
initializingPassport();

const login = async (req, res) => {
  res.json(req.user);
};

// get all teacher information
const teacherList = async (req, res) => {
  try {
    const list = await teachers
      .find()
      .populate("admin_id", "_id firstname lastname");
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// get teacher information by id
const teacherById = async (req, res) => {
  try {
    const list = await teachers.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// adding teacher infomation

const teacherAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword, admin_id } =
      req.body;
    const result = await registerSchema.validateAsync(req.body);
    const teacherExist = await teachers.findOne({ email: result.email });
    if (teacherExist) {
      throw console.error("user exist");
    }

    const teacher = await new teachers({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      admin_id,
    });
    await teacher.save();
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(400).json({ meesage: "An error occured: " + error });
  }
};

// updating teacher information
const teacherUpdate = async (req, res) => {
  try {
    const teacher = await teachers.findById(req.params.id);
    Object.assign(teacher, req.body);
    await teacher.save();
    console.log(req.body);
    res.status(200).json({ Message: "Teacher details updated successfully" });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// removing Teacher information
const teacherDelete = async (req, res) => {
  try {
    await teachers.findByIdAndRemove(req.params.id);
    res.status(200).json({ Message: "Teacher removed successfully." });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

module.exports = {
  teacherAdd,
  teacherById,
  teacherDelete,
  teacherList,
  teacherUpdate,
  login,
};
