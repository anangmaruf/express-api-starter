const express = require("express");

const auth = require("./auth/auth.controller");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({
//     message: "Welcome API v1",
//   });
// });

router.use("/auth", auth);

module.exports = router;
