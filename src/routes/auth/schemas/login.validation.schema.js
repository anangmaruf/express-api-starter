const yup = require("yup");

const loginLinkSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

module.exports = {
  loginLinkSchema,
};
