const Redis = require('ioredis')
const { redisPort } = require('./config')

const redis = new Redis({
  port: parseInt(redisPort),
  host: 'redis'
})

module.exports = redis
