const express = require('express');
const {isAuthenticated} = require("../../../middleware");
const {softDeleteById, getById} = require("../../../services/PostService");
const {responseJson} = require("../../../utils");
const router = express.Router();

router.put('/:id/delete', isAuthenticated, async (req, res, next) => {
    try {
         const data = await softDeleteById(req.params);
         responseJson(res, data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;