// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

export default {
  development: {
    client: 'postgresql',
    connection: {
      port: Number(process.env.DB_PORT!),
      database: process.env.DATABASE!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};