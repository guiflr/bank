exports.up = async function up(knex) {
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.text('account').notNullable().unique();
    table.bigInteger('balance').notNullable();
    table
      .enu('type', ['deposit', 'withdraw', 'transfer'], {
        useNative: true,
        enumName: 'transaction_type',
      })
      .notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('transactions');
  await knex.raw('DROP TYPE IF EXISTS transaction_type');
};
