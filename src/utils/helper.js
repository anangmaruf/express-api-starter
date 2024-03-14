const redis = require("../config/redis.config");
const {environtment} = require("../constants");

const checkIfExistWithStatus = (data, res, codeStatus, message) => {
  if (data) {
    res.status(codeStatus);
    throw new Error(message);
  }
};

const responseJson = (res, data) => {
  res.json({
    ...data
  })
}

module.exports = {
  checkIfExistWithStatus,
  responseJson
};
