const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const { unauthorized, tokenError } = require("./apiError");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //   console.log(bearerHeader);
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    jwt.verify(req.token, secret, (err, data) => {
      if (err) {
        res.status(401).json(unauthorized);
      } else {
        next();
      }
    });
  } else {
    res.status(401).json(tokenError);
  }
}

module.exports = { verifyToken };
