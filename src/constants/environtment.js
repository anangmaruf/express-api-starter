const environtment = {
    APP_NAME: process.env.APP_NAME,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_EXPIRE_TIME: process.env.REDIS_DEFAULT_EXPIRATION_INT
}

module.exports = environtment