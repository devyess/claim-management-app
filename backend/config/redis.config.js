const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
      console.log('Connected to Redis');
});

module.exports = redisClient;