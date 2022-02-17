const { sequelize } = require('../sequelize.js')
const { Article } = require('../models/article.js')
const ServiceError = require('../ServiceError')
const redis = require('../redis')
const Joi = require('joi')

async function showArticle ({ id }) {
  let transaction

  try {
    const cached = await redis.get(id)
    if (cached) return JSON.parse(cached)
    transaction = await sequelize.transaction()
    const article = await Article.findOne({ where: { id }, transaction })
    if (!article) {
      throw new ServiceError({
        message: 'Provided non-existent article id',
        code: 'ARTICLE_NOT_FOUND'
      })
    }
    const data = {
      id: article.id,
      title: article.title,
      description: article.description,
      created_date: article.created_date
    }
    await transaction.commit()

    await redis.set(id, JSON.stringify(data), 'ex', 86400)

    return data
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {
  id: Joi.number()
    .integer()
    .positive()
}

module.exports = { service: showArticle, validationRules }
