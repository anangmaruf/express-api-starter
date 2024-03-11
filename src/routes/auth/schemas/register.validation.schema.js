const yup = require("yup");

const registerLinkSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5, "").required(),
  }),
});

module.exports = {
  registerLinkSchema,
};
