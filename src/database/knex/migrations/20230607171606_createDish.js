
exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id")
  table.string("title")
  table.string("description")
  table.string("price")
  table.string("category")
  table.string("avatar")
  table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("dishes");
 