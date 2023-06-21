exports.up = knex => knex.schema.createTable("category", table => {
  table.increments("id")
  table.string("name")
  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE")

});

exports.down = knex => knex.schema.dropTable("category");
