/** @typedef {import('knex/types').Knex} knex */

import knex from "knex";

const knexConfig = {
  client: "better-sqlite3",
  connection: {
    filename: "./db/pogo_gdl.db",
  },
  migrations: {
    directory: "./migrations",
    loadExtensions: [".js"],
  },
  useNullAsDefault: true,
};

/**
 * @type {knex}
 */
export const db = knex(knexConfig);

db.migrate.latest();
