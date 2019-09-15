const config = require('../knexfile.js')
const knex = require('knex')(config)

//Executa a migração no momento que rodar o backend
knex.migrate.latest([config])

module.exports = knex