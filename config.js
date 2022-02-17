const port = 3000 || process.env.PORT
const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME
}
const redisPort = 6379 || process.env.REDIS_PORT

module.exports = { port, db, redisPort }
