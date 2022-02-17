const { sequelize, DT } = require('../db.js')

const Article = sequelize.define('article', {
  id: {
    type: DT.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DT.STRING
  },
  description: {
    type: DT.STRING
  },
  created_date: {
    type: DT.DATE
  }
}, {
  createdAt: 'created_date'
})

module.exports = { Article }
