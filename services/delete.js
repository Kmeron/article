const { sequelize } = require('../sequelize.js')
const { Article } = require('../models/article.js')
const ServiceError = require('../ServiceError')
const redis = require('../redis')

const Joi = require('joi')

async function deleteArticle ({ id }) {
  const transaction = await sequelize.transaction()

  try {
    const result = await Article.destroy({
      where: {
        id
      },
      transaction
    })

    if (!result) {
      throw new ServiceError({
        message: 'Provided non-existent note id',
        code: 'INVALID_NOTE_ID'
      })
    }
    await transaction.commit()
    await redis.del(id)
    await redis.del('list')
    return {}
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {
  id: Joi.number()
    .integer()
    .required()
}

module.exports = { service: deleteArticle, validationRules }
