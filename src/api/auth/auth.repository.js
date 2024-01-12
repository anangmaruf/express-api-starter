const bcrypt = require("bcrypt");
const { db } = require("../../utils");
const { hashToken } = require("../../utils/hashToken");

/**
 * mandatory asign param email
 * @param {*} email
 * @returns
 */
const findByEmail = async (email) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * mandatory asign param data user
 * @param {*} user
 * @returns
 */
const insertUser = async (user) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return await db.user.create({
    data: user,
  });
};

/**
 * mandatory asign param id from user data
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * used when user create a refresh token
 * @param {}
 * @returns
 */
const addRefreshTokenToWhiteList = async (jti, refreshToken, userId) => {
  return await db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

/**
 * find refresh token by id
 * @param {*} id
 * @returns
 */
const findRefreshTokenById = async (id) => {
  return await db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

/**
 * soft deleted refresh token by id refresh token
 * @param {*} id
 * @returns
 */
const deleteRefreshToken = async (id) => {
  return await db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

/**
 * revoked all refreshToken based on user ID
 * @param {*} userId
 * @returns
 */
const revokeTokens = async (userId) => {
  return await db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};

module.exports = {
  findByEmail,
  insertUser,
  findById,
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
