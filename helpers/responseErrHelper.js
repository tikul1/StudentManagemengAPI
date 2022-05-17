const successResponse = (code, status, formData) => {
  let data = {
    code: code,
    status: "Success",
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

const errorResponse = (code, status1, formData) => {
  let data = {
    status1: "Error",
    code: code,
    formData: formData,
  };
  return data;
};

module.exports = { successResponse, alertResponse, errorResponse };
