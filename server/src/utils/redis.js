const Redis = require('ioredis');

// Create a Redis instance.
const redis = new Redis({
  port: 6379, // Redis port
  host: process.env.REDIS_URL || 'redis',
});

module.exports = { redis };
