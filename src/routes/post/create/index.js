const express = require('express');
const router = express.Router();

const {createPost} = require("../../../services/PostService");
const {environtment} = require("../../../constants");
const {setDataCache} = require("../../../utils");


const prefixCache = `${environtment.APP_NAME}-POST`
router.post('/', async (req, res, next) => {
    try {
        const post = await createPost(req.body);

        /**
         * set data cache
         * params (key, data)
        */
        await setDataCache(`${prefixCache}-${post.id}`, post);
        res.json({
            data: post
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;