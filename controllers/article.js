const { makeServiceRunner } = require('./makeServiceRunner')

const create = require('../services/create')
const remove = require('../services/delete')
const update = require('../services/update')
const show = require('../services/show')
const list = require('../services/list')

module.exports = {
  create: makeServiceRunner(create, (req, res) => ({ ...req.body })),
  delete: makeServiceRunner(remove, (req, res) => ({ ...req.params })),
  update: makeServiceRunner(update, (req, res) => ({ ...req.params, ...req.body })),
  show: makeServiceRunner(show, (req, res) => ({ ...req.params })),
  list: makeServiceRunner(list, (req, res) => ({ ...req.query }))
}
