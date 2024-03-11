const express = require('express');
const {environtment} = require("../../../constants");
const {getDataCache} = require("../../../utils/cache");
const {getById} = require("../../../services/PostService");
const router = express.Router();

const prefixCache = `${environtment.APP_NAME}-POST`;
router.get('/:id', async (req, res, next) => {
    try {
        const param = req.params
        const dataCache = await getDataCache(`${prefixCache}-${param.id}`);
        if (dataCache === null) {
            const getpost = await getById(...param);
            res.json({ getpost });
        } else {
            res.json({
                dataCache
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;