const bcrypt = require("bcrypt");
const { db } = require("../../utils");
const { hashToken } = require("../../utils/hashToken");

/**
 * mandatory asign param email
 * @param {*} email
 * @returns
 */
const findByEmail = async (email) => {
  return await db.admin.findUnique({
    where: {
      email,
    },
  });
};

/**
 * mandatory asign param data admin
 * @param {*} admin
 * @returns
 */
const insertAdmin = async (admin) => {
  admin.password = bcrypt.hashSync(admin.password, 12);
  return await db.admin.create({
    data: admin,
  });
};

/**
 * mandatory asign param id from admin data
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return await db.admin.findUnique({
    where: {
      id,
    },
  });
};

/**
 * used when admin create a refresh token
 * @param {}
 * @returns
 */
const addRefreshTokenToWhiteList = async (jti, refreshToken, adminId) => {
  return await db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      adminId,
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
 * revoked all refreshToken based on admin ID
 * @param {*} adminId
 * @returns
 */
const revokeTokens = async (adminId) => {
  return await db.refreshToken.updateMany({
    where: {
      adminId,
    },
    data: {
      revoked: true,
    },
  });
};

module.exports = {
  findByEmail,
  insertAdmin,
  findById,
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
