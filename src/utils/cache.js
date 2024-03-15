const redis = require("../config/redis.config")
const {environtment} = require("../constants");

/**
 * Set data cache
 * params (key, data)
 */
const setDataCache = async (key, data) => {
    await redis.setEx(key, parseInt(environtment.REDIS_EXPIRE_TIME), JSON.stringify(data));
}

/**
 * Get data cache
 * params (key)
 */
const getDataCache = async (key) => {
    const cache = await redis.get(key);
    return JSON.parse(cache);
}

/**
 * Remove data cache
 * params (key)
 */
const removeDataCache = async (key) => {
    await redis.del(key);
}
module.exports = {
    setDataCache,
    getDataCache,
    removeDataCache
}