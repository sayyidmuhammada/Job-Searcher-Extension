// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from "dotenv";

function knexConfig(pathValue: string) {
  // Warning: this might be error
  // I give this statement for yarn run migrate
  dotenv.config({ path: pathValue === undefined ? "../.env" : pathValue });
  const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
  const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

  return {
    development: {
      client: "postgresql",
      connection: {
        connectionString: URL,
        ssl: true,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  };
}

export default knexConfig;
