const { sequelize } = require('../sequelize.js')
const { Article } = require('../models/article.js')
const ServiceError = require('../ServiceError')
const Joi = require('joi')
const redis = require('../redis')

async function updateArticle ({ title, description, id }) {
  const transaction = await sequelize.transaction()

  try {
    const isArticleExists = Article.findOne({ where: { id }, transaction })
    if (!isArticleExists) {
      throw new ServiceError({
        message: 'Provided non-existent article id',
        code: 'ARTICLE_NOT_FOUND'
      })
    }
    await Article.update({
      title,
      description
    }, {
      where: {
        id
      },
      transaction
    })

    const article = await Article.findOne({
      where: {
        id
      },
      transaction
    })

    await transaction.commit()
    await redis.del(id)
    await redis.del('list')
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      created_date: article.created_date
    }
  } catch (error) {
    transaction.rollback()
    throw error
  }
}

const validationRules = {

  id: Joi.number()
    .integer()
    .positive()
    .required(),

  title: Joi.string(),

  description: Joi.string()
}

module.exports = { service: updateArticle, validationRules }
