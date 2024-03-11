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
  const user = await findByEmail(email);
  return user;
};

const findUserById = async (id) => {
  const user = await findById(id);
  return user;
};

const postUser = async (data) => {
  const response = await insertUser(data);
  return response;
};

const postAddRefreshTokenToWhiteList = async (tokens) => {
  const { jti, refreshToken, userId } = tokens;
  const response = await addRefreshTokenToWhiteList(jti, refreshToken, userId);
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
