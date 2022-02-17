const { sequelize } = require('../sequelize.js')
const { Article } = require('../models/article.js')
// const Joi = require('joi')
const redis = require('../redis.js')

async function getArticles () {
  const query = {
    order: [['id', 'DESC']],
    limit: 10,
    offset: 0
  }
  let transaction

  try {
    const cachedList = await redis.get('list')
    if (cachedList) return JSON.parse(cachedList)

    transaction = await sequelize.transaction()
    const { rows, count } = await Article.findAndCountAll({ ...query, transaction })
    const meta = { limit: query.limit, offset: query.offset, totalCount: count }
    const data = rows.map(article => {
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        created_date: article.created_date
      }
    })
    await transaction.commit()
    await redis.set('list', JSON.stringify({ data, meta }), 'ex', 86400)
    return { data, meta }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {

}

module.exports = { service: getArticles, validationRules }
