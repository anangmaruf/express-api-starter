const express = require('express');
const router = express.Router();

const {createPost} = require("../../../services/PostService");
const {environtment} = require("../../../constants");
const {isAuthenticated} = require("../../../middleware");
const {postValidation} = require("../post.validation");
const {postSchema} = require("../schema");
const {responseJson, responseJsonError} = require("../../../utils");


router.post('/',
        isAuthenticated,
        postValidation(postSchema),
        async (req, res, next) => {
    try {
        const post = await createPost(req.body);
        responseJson(res, post)
    } catch (error) {
        responseJsonError(res, 500, error);
    }
});

module.exports = router;