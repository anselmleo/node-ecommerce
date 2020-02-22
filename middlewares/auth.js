const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

module.exports = function(req, res, next) {
  // Get token from header
  let token = req.header("authorization");

  token = token.replace("Bearer ", "");

  //check if not token
  if (!token) {
    return res.status(401).send({
      status: "fail",
      message: "No token, authorization denied"
    });
  }

  //Verity token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    //log headers
    console.log("request headers", req.headers);

    //log authenticated user
    // console.log(req.user);

    // console.log("i got here");

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      status: "fail",
      message: "Token is not valid"
    });
  }
};
