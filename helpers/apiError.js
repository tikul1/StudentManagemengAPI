const adminExistError = {
  status: "Error",
  code: 400,
  message: "Admin already exist.",
};

const teacherExistError = {
  status: "Error",
  code: 400,
  message: "Teacher already exist.",
};

const studentExistError = {
  status: "Error",
  code: 400,
  message: "Student already exist.",
};

const adminNotFound = {
  status: "Error",
  code: 404,
  message: "Admin not found.",
};

const teacherNotFound = {
  status: "Error",
  code: 404,
  message: " Teacher not found.",
};

const studentNotFound = {
  status: "Error",
  code: 404,
  message: "Students not found.",
};

const addError = {
  status: "Error",
  code: 401,
  message: "Failed to Add/Update Admin.",
};

const studentAddError = {
  status: "Error",
  code: 401,
  message: "Failed to Add/Update Student.",
};

const teacherAddError = {
  status: "Error",
  code: 401,
  message: "Failed to Add/Updater Teacher.",
};

const adminSuccess = {
  status: "Success",
  code: 200,
  message: "Admin added/updated successfully.",
};

const studentSuccess = {
  status: "Success",
  code: 200,
  message: "Student added/updated successfully.",
};

const teacherSuccess = {
  status: "Success",
  code: 200,
  message: "Teacher added/updared successfully.",
};

const adminRemove = {
  status: "Success",
  code: 200,
  message: "Admin removed successfully.",
};

const studentRemove = {
  status: "Success",
  code: 200,
  message: "Student removed successfully.",
};

const teacherRemove = {
  status: "Success",
  code: 200,
  message: "Teacher removed successfully.",
};

const invalidCredentials = {
  status: "Error",
  code: 401,
  message: "Please enter correct credentials.",
};

const studentPicSuccess = {
  status: "Success",
  code: 200,
  message: "Image/Images uploaded successfully.",
};
const studentPicFail = {
  status: "Error",
  code: 401,
  message: "Image/Images failed to upload.",
};

function invalidPathHandler(req, res, next) {
  res.status(404);
  res.send("Invalid path");
}

module.exports = {
  invalidPathHandler,
  adminExistError,
  adminNotFound,
  addError,
  adminSuccess,
  adminRemove,
  invalidCredentials,
  studentNotFound,
  studentAddError,
  studentSuccess,
  studentExistError,
  studentRemove,
  studentPicSuccess,
  studentPicFail,
  teacherAddError,
  teacherExistError,
  teacherNotFound,
  teacherRemove,
  teacherSuccess,
};
