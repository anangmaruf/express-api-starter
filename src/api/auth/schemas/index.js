const { loginLinkSchema } = require("./login.validation.schema");
const { registerLinkSchema } = require("./register.validation.schema");
const { refreshTokenLinkSchema } = require("./refreshToken.validation.schema");

module.exports = {
  loginLinkSchema,
  registerLinkSchema,
  refreshTokenLinkSchema,
};
