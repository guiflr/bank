import 'dotenv/config';
import path from 'path';

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations'),
    extension: 'js',
  },
};
