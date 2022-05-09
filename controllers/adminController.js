const admins = require("../models/adminModel");

const adminList = async (req, res) => {
  try {
    const list = await admins.find();
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

const adminById = async (req, res) => {
  try {
    const list = await admins.findById(req.params.id);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

const adminAdd = async (req, res) => {
  try {
    const admin = await admins.create({
      firstname: req.body.firstname,
      lastnam: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    res.status(200).json({ admin });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

const adminUpdate = async (req, res) => {
  try {
    const list = await findById(req.params.id);
    Object.assign(list, req.body);
    res.status(200).json({ Message: "Admin details updated successfully" });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

const adminDelete = async (req, res) => {
  try {
    const list = req.params.id;
    await findbyIdAndRemove(list);
    res.status(200).json({ Message: "Admin removed successfully." });
  } catch (e) {
    res.status(400).json({ meesage: "An error occured: " + e });
  }
};

module.exports = { adminList, adminById, adminAdd, adminUpdate, adminDelete };
