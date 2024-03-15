const express = require("express");
const { isAuthenticated } = require("../../middleware");
const router = express.Router();

router.get("/user", isAuthenticated, async (req, res, next) => {
  try {
  } catch (error) {}
});
