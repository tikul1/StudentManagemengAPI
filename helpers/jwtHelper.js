const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //   console.log(bearerHeader);
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    jwt.verify(req.token, secret, (err, data) => {
      if (err) {
        res.status(401).json({ Message: "Access denied. Unauthorized." });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ Message: "Token not provided" });
  }
}

module.exports = { verifyToken };
