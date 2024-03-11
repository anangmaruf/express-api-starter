const redis = require('redis');
const {environtment} = require("../constants");

const redisConfig = redis.createClient({
    port: parseInt(environtment.REDIS_PORT),
    host: environtment.REDIS_HOST
})
redisConfig.on('connect',() => {
    console.log('connected to redis successfully!');
});

redisConfig.on('ready',() => {
    console.log('Redis connection ready ' );
});

redisConfig.on('error',(error) => {
    console.log('Redis connection error :', error);
});

redisConfig.on('end',(error) => {
    console.log('Redis connection end');
});

redisConfig.connect()

module.exports = redisConfig;

