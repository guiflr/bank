import 'dotenv/config';

import bcrypt from 'bcrypt';

exports.seed = async function seed(knex) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT || 10),
  );

  await knex('users')
    .insert({ username, password: hashedPassword })
    .onConflict('username')
    .merge({ password: hashedPassword });
};
