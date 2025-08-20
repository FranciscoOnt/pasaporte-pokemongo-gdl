/** @typedef {import('knex/types').Knex} knex */
/**
 * @param {knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("sites", function (table) {
    table.increments("id");
    table.string("uuid", 255).notNullable().unique();
    table.string("displayName", 255);
    table.float("lat").defaultTo(0);
    table.float("lng").defaultTo(0);
    table.float("rad").defaultTo(0);
    table.boolean("active").defaultTo(true);
    table.integer("createdAt").defaultTo(0);
    table.integer("updatedAt").defaultTo(0);
  });
}

/**
 * @param {knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("sites");
}
