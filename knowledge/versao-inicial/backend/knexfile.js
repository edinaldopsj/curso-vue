module.exports = {
    client: 'postgresql',
    connection: {
      database: 'knowledge',
      user:     'admin',
      password: 'Pam123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}
