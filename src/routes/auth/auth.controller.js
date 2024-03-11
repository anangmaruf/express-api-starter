const express = require("express");
const {
  generateTokens,
  hashToken,
  checkIfExistWithStatus,
} = require("../../utils");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  postUser,
  postAddRefreshTokenToWhiteList,
  getFindRefreshTokenById,
  removeRefreshToken,
  findUserById,
  revokeAllRefreshToken,
} = require("./auth.services");
const {
  registerValidate,
  loginValidate,
  refreshTokenValidate,
} = require("./auth.validation");
const {
  registerLinkSchema,
  loginLinkSchema,
  refreshTokenLinkSchema,
} = require("./schemas");

const router = express.Router();

router.post(
  "/register",
  registerValidate(registerLinkSchema),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await findUserByEmail(email);
      /**
       * Check if Existing email address
       */
      checkIfExistWithStatus(existingUser, res, 400, "Email already in use.");

      const user = await postUser({ name, email, password });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken,
        userId: user.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginValidate(loginLinkSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existingUser = await findUserByEmail(email);
      /**
       * Check if Existing email address
       */
      checkIfExistWithStatus(
        !existingUser,
        res,
        403,
        "Invalid login credentials."
      );

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/refreshToken",
  refreshTokenValidate(refreshTokenLinkSchema),
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      const payoload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const savedRefreshToken = await getFindRefreshTokenById(payoload.jti);

      /**
       * Check if token active
       */
      checkIfExistWithStatus(
        !savedRefreshToken || savedRefreshToken.revoked === true,
        res,
        401,
        "Unauthorized"
      );

      const hashedToken = hashToken(refreshToken);
      /**
       * Check if token match with hashedToken
       */
      checkIfExistWithStatus(
        hashedToken !== savedRefreshToken.hashedToken,
        res,
        401,
        "Unauthorized"
      );

      const user = await findUserById(payoload.userId);
      /**
       * Check if token match with hashedToken
       */
      checkIfExistWithStatus(
        hashedToken !== savedRefreshToken.hashedToken,
        res,
        401,
        "Unauthorized"
      );

      await removeRefreshToken(savedRefreshToken.id);
      const jti = uuidv4();

      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/revokeRefreshTokens", async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeAllRefreshToken(userId);
    res.json({ message: `Tokens revoked for user with id ${userId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
