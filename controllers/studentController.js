const students = require("../models/studentModel");
const { studentRegisterSchema } = require("../helpers/auth");
const studentMessage = require("../helpers/apiError");
const {
  successResponse,
  alertResponse,
  errorResponse,
} = require("../helpers/responseErrHelper");

// get all student information
const studentList = async (req, res) => {
  try {
    const list = await students
      .find()
      .populate("teacher_id", "_id firstname lastname");
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Success",
          studentMessage.student.studentList,
          list
        )
      );
  } catch (e) {
    res
      .status(400)
      .json(
        errorResponse(400, "Error", studentMessage["student"].studentNotFound)
      );
  }
};

// get student information by id
const studentById = async (req, res) => {
  try {
    const list = await students.findById(req.params.id);
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Success",
          studentMessage.student.studdentById,
          list
        )
      );
  } catch (e) {
    res
      .status(400)
      .json(
        errorResponse(400, "Error", studentMessage["student"].studentNotFound)
      );
  }
};

// adding student infomation

const studentAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, teacher_id } = req.body;
    const result = await studentRegisterSchema.validateAsync(req.body);
    const studentExist = await students.findOne({ email: result.email });
    if (studentExist) {
      res
        .status(401)
        .json(
          alertResponse(
            401,
            "Alert",
            studentMessage["student"].studentExistError
          )
        );
    } else {
      const student = await new students({
        firstname,
        lastname,
        email,
        teacher_id,
      });
      await student.save();
      res
        .status(200)
        .json(
          successResponse(
            200,
            "Success",
            studentMessage.student.studentSuccess,
            student
          )
        );
    }
  } catch (error) {
    res
      .status(400)
      .json(
        console.error(400, "Error", studentMessage["student"].studentAddError)
      );
  }
};

// updating student information
const studentUpdate = async (req, res) => {
  try {
    const student = await students.findById(req.params.id);
    Object.assign(student, req.body);
    await student.save();
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Success",
          studentMessage.student.studentSuccess,
          student
        )
      );
  } catch (e) {
    res
      .status(400)
      .json(
        errorResponse(400, "Error", studentMessage["student"].studentNotFound)
      );
  }
};

// removing student information
const studentDelete = async (req, res) => {
  try {
    const student = await students.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Success",
          studentMessage["student"].studentRemove,
          student
        )
      );
  } catch (e) {
    res
      .status(400)
      .json(
        errorResponse(400, "Error", studentMessage["student"].studentNotFound)
      );
  }
};

const picUpload = async (req, res) => {
  try {
    if (!req.file) {
      res
        .status(400)
        .send(
          errorResponse(400, "Error", studentMessage["student"].studentPicFail)
        );
    } else {
      res.send(
        successResponse(
          200,
          "Success",
          studentMessage["student"].studentPicSuccess,
          req.file
        )
      );
    }
  } catch (error) {
    res
      .status(400)
      .send(
        errorResponse(400, "Error", studentMessage["student"].studentPicFail)
      );
  }
};

const multiPicUpload = async (req, res) => {
  try {
    if (req.files) {
      res.send(
        successResponse(
          200,
          "Success",
          studentMessage["student"].studentPicSuccess,
          req.files
        )
      );
    } else {
      res
        .status(400)
        .send(
          errorResponse(400, "Error", studentMessage["student"].studentPicFail)
        );
    }
  } catch (error) {
    res
      .status(400)
      .send(
        errorResponse(400, "Error", studentMessage["student"].studentPicFail)
      );
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
