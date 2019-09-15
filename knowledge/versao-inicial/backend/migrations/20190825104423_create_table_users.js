
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary()
		table.string('name').notNull()
		table.string('email').notNull().unique()
		table.string('password').notNull()
		table.boolean('admin').notNull().defaultTo(false)

	})
};

//Fazer no down, sempre o contrário do que no UP, o Up é o q vai pras novas releases do seu software
exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users')
};
