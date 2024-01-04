const jwt = require("jsonwebtoken");
const { checkIfExistWithStatus } = require("../utils");

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  checkIfExistWithStatus(!authorization, res, 401, "Un-Authorized");

  try {
    const token = authorization.split(" ")[1];
    const payoload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.payoload = payoload;
  } catch (error) {
    res.status(401);
    if (error.name === "TokenExpiredError") {
      throw new Error(error.name);
    }
    throw new Error("Un-Authorized");
  }
}

module.exports = { isAuthenticated };
