const express = require("express");
const { isAuthenticated } = require("../../middleware");
const router = express.Router();

router.get("/admin", isAuthenticated, async (req, res, next) => {
  try {
    const { adminId } = req.payload;
    const admin = await findAd;
  } catch (error) {}
});
