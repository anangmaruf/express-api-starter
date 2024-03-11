const redis = require("../config/redis.config");
const {environtment} = require("../constants");

const checkIfExistWithStatus = (data, res, codeStatus, message) => {
  if (data) {
    res.status(codeStatus);
    throw new Error(message);
  }
};

module.exports = {
  checkIfExistWithStatus,
};
