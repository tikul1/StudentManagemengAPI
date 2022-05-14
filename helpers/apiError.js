const userExist = {
  status: "Error",
  code: 400,
  message: "user already exist.",
};

const notFound = {
  status: "Error",
  code: 404,
  message: "user not found.",
};

function invalidPathHandler(req, res, next) {
  res.status(404);
  res.send("Invalid path");
}

module.exports = { invalidPathHandler, userExist, notFound };
