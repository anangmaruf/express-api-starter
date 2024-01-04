const { hashToken, db } = require("../../utils");
const {
  findByEmail,
  insertUser,
  findById,
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} = require("./auth.repository");

const findUserByEmail = async (email) => {
  const admin = await findByEmail(email);
  return admin;
};

const findUserById = async (id) => {
  const admin = await findById(id);
  return admin;
};

const postUser = async (data) => {
  const response = await insertUser(data);
  return response;
};

const postAddRefreshTokenToWhiteList = async (tokens) => {
  const { jti, refreshToken, adminId } = tokens;
  const response = await addRefreshTokenToWhiteList(jti, refreshToken, adminId);
  return response;
};

const getFindRefreshTokenById = async (refreshToken) => {
  const response = await findRefreshTokenById(refreshToken);
  return response;
};

const removeRefreshToken = async (id) => {
  const response = await deleteRefreshToken(id);
  return response;
};

const revokeAllRefreshToken = async (id) => {
  const response = await revokeTokens(id);
  return response;
};

module.exports = {
  findUserByEmail,
  findUserById,
  postUser,
  postAddRefreshTokenToWhiteList,
  getFindRefreshTokenById,
  removeRefreshToken,
  revokeAllRefreshToken,
};
