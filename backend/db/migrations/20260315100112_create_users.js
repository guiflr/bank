exports.up = async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  await knex.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.text('username').notNullable().unique();
    table.text('password').notNullable();
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('users');
};
