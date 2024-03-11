const express = require("express");
const { isAuthenticated } = require("../../middleware");
const router = express.Router();

router.get("/user", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findAd;
  } catch (error) {}
});
