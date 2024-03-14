const express = require('express');
const router = express.Router();

const {createPost} = require("../../../services/PostService");
const {environtment} = require("../../../constants");
const {isAuthenticated} = require("../../../middleware");


router.post('/', isAuthenticated, async (req, res, next) => {
    try {
        const post = await createPost(req.body);
        res.json({
            data: post
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;