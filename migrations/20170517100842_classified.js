exports.up = function(knex) {
  return knex.schema.createTable('classifieds', (table) => {
    table.increments();
    table.string('title', 255).notNullable();
    table.string('description', 255).notNullable();
    table.decimal('price').notNullable();
    table.string('item_image', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('classifieds')
};
