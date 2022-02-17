const sequelize = require('./db.js')
const article = require('./models/article')

const models = {
  Article: article.Article
}

module.exports = {
  ...sequelize,
  ...models
}
