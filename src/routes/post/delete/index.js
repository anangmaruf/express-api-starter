const express = require("express");
const {isAuthenticated} = require("../../../middleware");
const {deleteById} = require("../../../services/PostService");
const {responseJson, responseJsonError} = require("../../../utils");
const router = express.Router();

router.delete("/:id", isAuthenticated, async (req, res, next) => {
    try {
        const param = req.params;
        const post = await deleteById(param.id);
        responseJson(res, post);
    } catch (error) {
        responseJsonError(res, 500, error);
    }
});

module.exports = router;