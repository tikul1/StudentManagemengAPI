const successResponse = (code, status, message, formData) => {
  let data = {
    code: code,
    status: "Success",
    message: message,
    formData: formData,
  };
  return data;
};

const alertResponse = (code, status1, formData) => {
  let data = {
    status1: "Alert",
    code: code,
    formData: formData,
  };
  return data;
};

const errorResponse = (code, status1, message) => {
  let data = {
    status1: "Error",
    code: code,
    message: message,
  };
  return data;
};

module.exports = { successResponse, alertResponse, errorResponse };
