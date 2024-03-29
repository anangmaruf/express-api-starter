const express = require("express");

const auth = require("./auth/auth.controller");
const post = require("./post");
const router = express.Router();

router.use("/auth", auth);
router.use("/post", post);

module.exports = router;
