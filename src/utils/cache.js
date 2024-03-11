const redis = require("../config/redis.config")
const {environtment} = require("../constants");
const setDataCache = async (key, data) => {
    await redis.setEx(key, parseInt(environtment.REDIS_EXPIRE_TIME), JSON.stringify(data));
}

const getDataCache = async (key) => {
    const cache = await redis.get(key);
    return JSON.parse(cache);
}

module.exports = {
    setDataCache,
    getDataCache
}