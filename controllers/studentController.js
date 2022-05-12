const students = require("../models/studentModel");
const { studentRegisterSchema } = require("../helpers/auth");

// get all student information
const studentList = async (req, res) => {
  try {
    const list = await students
      .find()
      .populate("teacher_id", "_id firstname lastname");
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// get student information by id
const studentById = async (req, res) => {
  try {
    const list = await students.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// adding student infomation

const studentAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, teacher_id } = req.body;
    const result = await studentRegisterSchema.validateAsync(req.body);
    const studentExist = await students.findOne({ email: result.email });
    if (studentExist) {
      throw console.error("user exist");
    }

    const student = await new students({
      firstname,
      lastname,
      email,
      teacher_id,
    });
    await student.save();
    res.status(200).json({ student });
  } catch (error) {
    res.status(400).json({ meesage: "An error occured: " + error });
  }
};

// updating student information
const studentUpdate = async (req, res) => {
  try {
    const student = await students.findById(req.params.id);
    Object.assign(student, req.body);
    await student.save();
    console.log(req.body);
    res.status(200).json({ Message: "student details updated successfully" });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

// removing student information
const studentDelete = async (req, res) => {
  try {
    await students.findByIdAndRemove(req.params.id);
    res.status(200).json({ Message: "student removed successfully." });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

const picUpload = async (req, res) => {
  try {
    console.log(req.file);
    res.send("Image uploaded successfully.");
  } catch (error) {
    res.send("Error occured" + error);
  }
};

const multiPicUpload = async (req, res) => {
  try {
    console.log(req.files);
    res.send("Images uploaded successfully.");
  } catch (error) {
    res.send("Error occured" + error);
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
