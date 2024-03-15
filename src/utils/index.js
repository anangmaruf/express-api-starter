const { db } = require("../config/database.config");
const { hashToken } = require("./hashToken");
const { setDataCache, removeDataCache, getDataCache } = require("./cache");
const {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
} = require("./jwt.user");
const {
  checkIfExistWithStatus,
  responseJson,
  responseJsonError} = require("./helper");

module.exports = {
  db,
  hashToken,
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  checkIfExistWithStatus,
  setDataCache,
  getDataCache,
  removeDataCache,
  responseJson,
  responseJsonError
};
