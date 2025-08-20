/** @typedef {import('knex/types').Knex} knex */
/**
 * @param {knex} knex
 */
export function up(knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("uuid", 255).notNullable().unique();
      table.string("displayName", 20);
      table.string("team").defaultTo("none");
      table.integer("profileColor").defaultTo(0);
      table.integer("nameUpdateDate").defaultTo(0);
      table.integer("teamUpdateDate").defaultTo(0);
      table.integer("lastLogin").defaultTo(0);
      table.integer("createdAt").defaultTo(0);
      table.boolean("active").defaultTo(true);
    })
    .createTable("federated_credentials", function (table) {
      table.increments("id");
      table.integer("user_id").notNullable();
      table.string("provider").notNullable();
      table.string("subject").notNullable();
    });
}

/**
 * @param {knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("users").dropTable("federated_credentials");
}
