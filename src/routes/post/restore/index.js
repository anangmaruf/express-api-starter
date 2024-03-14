const express = require("express");
const {isAuthenticated} = require("../../../middleware");
const {restoreById} = require("../../../services/PostService");
const {responseJson} = require("../../../utils");
const router = express.Router();

router.put("/:id/restore", isAuthenticated, async (req, res, next) => {
   try {
       const post = await restoreById(req.params);
       responseJson(res, post);
   } catch (error) {
       next(error);
   }
});

module.exports = router;