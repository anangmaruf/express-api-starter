const jwt = require("jsonwebtoken");
const { checkIfExistWithStatus } = require("../utils");

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.payload = payload;
  } catch (error) {
    res.status(401);
    if (error.name === "TokenExpiredError") {
      throw new Error(error.name);
    }
    throw new Error("Un-Authorized");
  }
  return next();
}

module.exports = { isAuthenticated };
