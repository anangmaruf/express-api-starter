const express = require('express');
const {getById} = require("../../../services/PostService");
const {setDataCache, responseJson} = require("../../../utils");
const {isAuthenticated} = require("../../../middleware");
const router = express.Router();

router.get('/:id', isAuthenticated, async (req, res, next) => {
    try {
        const param = req.params
        const post = await getById(param);
        responseJson(res, post);
    } catch (error) {
        next(error);
    }
});

module.exports = router;