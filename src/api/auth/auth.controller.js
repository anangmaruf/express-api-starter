const express = require("express");
const {
  db,
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  helper,
  hashToken,
} = require("../../utils");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  findAdminByEmail,
  postAdmin,
  postAddRefreshTokenToWhiteList,
  getFindRefreshTokenById,
  removeRefreshToken,
  findAdminById,
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

      const existingAdmin = await findAdminByEmail(email);
      /**
       * Check if Existing email address
       */
      checkIfExistWithStatus(existingAdmin, res, 400, "Email already in use.");

      const admin = await postAdmin({ name, email, password });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(admin, jti);
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken,
        adminId: admin.id,
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
      const existingAdmin = await findAdminByEmail(email);
      /**
       * Check if Existing email address
       */
      checkIfExistWithStatus(
        !existingAdmin,
        res,
        403,
        "Invalid login credentials."
      );

      const validPassword = await bcrypt.compare(
        password,
        existingAdmin.password
      );

      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingAdmin, jti);
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken,
        adminId: existingAdmin.id,
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

      const admin = await findAdminById(payoload.adminId);
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
        admin,
        jti
      );
      await postAddRefreshTokenToWhiteList({
        jti,
        refreshToken: newRefreshToken,
        adminId: admin.id,
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
    const { adminId } = req.body;
    await revokeAllRefreshToken(adminId);
    res.json({ message: `Tokens revoked for admin with id ${adminId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
