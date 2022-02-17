const { sequelize } = require('../sequelize.js')
const { Article } = require('../models/article.js')
const Joi = require('joi')
const redis = require('../redis')

async function createArticle ({ title, description }) {
  const transaction = await sequelize.transaction()

  try {
    const article = await Article.create({ title, description }, { transaction })
    await transaction.commit()
    await redis.del('list')
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      created_date: article.created_date
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {

  title: Joi.string(),

  description: Joi.string()
}

module.exports = { service: createArticle, validationRules }
