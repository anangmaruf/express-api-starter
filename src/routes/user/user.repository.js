const { db } = require("../../utils");

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
