const { db } = require("../../utils");

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
