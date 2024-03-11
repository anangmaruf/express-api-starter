const yup = require("yup");

const refreshTokenLinkSchema = yup.object({
  body: yup.object({
    refreshToken: yup.string().required(),
  }),
});

module.exports = {
  refreshTokenLinkSchema,
};
