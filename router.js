const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router
  .route('/article')
  .get(controllers.article.list)
  .post(controllers.article.create)

router
  .route('/article/:id')
  .get(controllers.article.show)
  .put(controllers.article.update)
  .delete(controllers.article.delete)

module.exports = router
