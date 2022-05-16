const students = require("../models/studentModel");
const { studentRegisterSchema } = require("../helpers/auth");
const {
  studentNotFound,
  studentAddError,
  studentSuccess,
  studentRemove,
  studentPicSuccess,
  studentPicFail,
  studentExistError,
} = require("../helpers/apiError");

// get all student information
const studentList = async (req, res) => {
  try {
    const list = await students
      .find()
      .populate("teacher_id", "_id firstname lastname");
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json(studentNotFound);
  }
};

// get student information by id
const studentById = async (req, res) => {
  try {
    const list = await students.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json(studentNotFound);
  }
};

// adding student infomation

const studentAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, teacher_id } = req.body;
    const result = await studentRegisterSchema.validateAsync(req.body);
    const studentExist = await students.findOne({ email: result.email });
    if (studentExist) {
      res.json(studentExistError);
    } else {
      const student = await new students({
        firstname,
        lastname,
        email,
        teacher_id,
      });
      await student.save();
      res.status(200).json(studentSuccess);
    }
  } catch (error) {
    res.status(400).json(studentAddError);
  }
};

// updating student information
const studentUpdate = async (req, res) => {
  try {
    const student = await students.findById(req.params.id);
    Object.assign(student, req.body);
    await student.save();
    res.status(200).json(studentSuccess);
  } catch (e) {
    res.status(400).json(studentNotFound);
  }
};

// removing student information
const studentDelete = async (req, res) => {
  try {
    await students.findByIdAndRemove(req.params.id);
    res.status(200).json(studentRemove);
  } catch (e) {
    res.status(400).json(studentNotFound);
  }
};

const picUpload = async (req, res) => {
  try {
    console.log(req.file);
    res.send(studentPicSuccess);
  } catch (error) {
    res.send(studentPicFail);
  }
};

const multiPicUpload = async (req, res) => {
  try {
    console.log(req.files);
    res.send(studentPicSuccess);
  } catch (error) {
    res.send(studentPicFail);
  }
};

module.exports = {
  studentAdd,
  studentById,
  studentDelete,
  studentList,
  studentUpdate,
  picUpload,
  multiPicUpload,
};
