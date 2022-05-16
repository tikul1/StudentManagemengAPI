const teachers = require("../models/teacherModel");
const { registerSchema } = require("../helpers/auth");
const { initializingPassport } = require("../helpers/teacherPassport");
const {
  teacherNotFound,
  teacherExistError,
  teacherSuccess,
  teacherAddError,
  teacherRemove,
} = require("../helpers/apiError");
initializingPassport();

//login controller for teacher
const login = async (req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    res.json(teacherNotFound);
  }
};

// get all teacher information
const teacherList = async (req, res) => {
  try {
    const list = await teachers
      .find()
      .populate("admin_id", "_id firstname lastname");
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json(teacherNotFound);
  }
};

// get teacher information by id
const teacherById = async (req, res) => {
  try {
    const list = await teachers.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json(teacherNotFound);
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
      res.status(400).json(teacherExistError);
    } else {
      const teacher = await new teachers({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        admin_id,
      });
      await teacher.save();
      res.status(200).json(teacherSuccess);
    }
  } catch (error) {
    res.status(400).json(teacherAddError);
  }
};

// updating teacher information
const teacherUpdate = async (req, res) => {
  try {
    const teacher = await teachers.findById(req.params.id);
    Object.assign(teacher, req.body);
    await teacher.save();
    res.status(200).json(teacherSuccess);
  } catch (e) {
    res.status(400).json(teacherAddError);
  }
};

// removing Teacher information
const teacherDelete = async (req, res) => {
  try {
    await teachers.findByIdAndRemove(req.params.id);
    res.status(200).json(teacherRemove);
  } catch (e) {
    res.status(400).json(teacherNotFound);
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
