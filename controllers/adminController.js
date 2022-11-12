const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admins = require("../models/adminModel");
const { registerSchema, loginSchema } = require("../helpers/auth");
const secret = process.env.SECRET_KEY;
const adminMessage = require("../helpers/apiError");
const exceljs = require("exceljs");
const moment = require("moment");
const { successResponse, alertResponse, errorResponse } = require("../helpers/responseErrHelper");

//creating excel report
const excel = async (req, res) => {
  const startDate = moment().month(4);
  // console.log(startDate);
  const endDate = moment(new Date()).endOf();
  // console.log(endDate);
  try {
    const excelUsers = await admins.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    // console.log(excelUsers);
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("My Admin");
    worksheet.columns = [
      { header: "S_no", key: "S_no", width: 10 },
      { header: "_id", key: "_id", width: 10 },
      { header: "firstname", key: "firstname", width: 10 },
      { header: "lastname", key: "lastname", width: 10 },
      { header: "email", key: "email", width: 10 },
      { header: "password", key: "password", width: 10 },
      { header: "confirmpassword", key: "confirmpassword", width: 10 },
    ];
    let count = 1;
    excelUsers.forEach((user) => {
      user.S_no = count;
      worksheet.addRow(user);
      count += 1;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const data = workbook.xlsx.writeFile("admin_may.xlsx");
    res.send("Done");
  } catch (e) {
    res.send(e);
  }
};

// get all admin information
const adminList = async (req, res) => {
  try {
    const list = await admins.find({});
    res.status(200).json(successResponse(200, "Success", adminMessage.admin.adminList, list));
  } catch (e) {
    res.status(404).json(errorResponse(404, "Error", adminMessage["admin"].adminNotFound));
  }
};

// get admin information by id
const adminById = async (req, res) => {
  try {
    const list = await admins.findById(req.params.id);

    res.status(200).json(successResponse(200, "Success", adminMessage.admin.adminById, { list }));
  } catch (e) {
    res.status(404).send(errorResponse(404, "Error", adminMessage["admin"].adminNotFound));
  }
};

// adding admin information
const adminAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const result = await registerSchema.validateAsync(req.body);
    const adminExist = await admins.findOne({ email: result.email });
    if (adminExist) {
      res.status(400).json(alertResponse(400, "Error", adminMessage.admin.adminExistError));
    } else {
      const admin = await new admins({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
      });
      await admin.save();
      res.status(200).send(successResponse(200, "Success", adminMessage.admin.adminSuccess, admin));
    }
  } catch (error) {
    res.status(401).json(errorResponse(401, "Error", adminMessage.admin.addError));
  }
};

// updating admin information
const adminUpdate = async (req, res) => {
  try {
    const admin = await admins.findById(req.params.id);
    Object.assign(admin, req.body);
    await admin.save();
    res.status(200).json(successResponse(200, "Success", adminMessage.admin.adminSuccess, admin));
  } catch (error) {
    res.status(401).json(errorResponse(401, "Error", adminMessage.admin.addError));
  }
};

// removing admin information
const adminDelete = async (req, res) => {
  try {
    const admin = await admins.findByIdAndRemove(req.params.id);
    res.status(200).json(successResponse(200, "Success", adminMessage.admin.adminRemove, admin));
  } catch (error) {
    res.status(404).json(errorResponse(404, "Error", adminMessage["admin"].adminNotFound));
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
        res.status(401).json(alertResponse(401, "Alert", adminMessage.jwt.invalidCredentials));
      } else {
        const payload = { email };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        res.status(200).json(successResponse(200, "Success", adminMessage.jwt.tokenSuccess, token));
      }
    } else {
      res.status(401).json(alertResponse(401, "Alert", adminMessage.jwt.invalidCredentials));
    }
  } catch (error) {
    res.status(404).json(alertResponse(401, "Alert", adminMessage.jwt.invalidCredentials));
  }
};

module.exports = {
  excel,
  adminList,
  adminById,
  adminAdd,
  adminUpdate,
  adminDelete,
  adminLogin,
};
