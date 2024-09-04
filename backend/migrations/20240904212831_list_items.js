/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('list_items', table => {
        table.increments('id').primary()
        table.string('description').notNullable()
        table.boolean('completed').defaultTo(false)
        table.integer('list_id').unsigned().references('id').inTable('list_names').onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('list_items')
};
