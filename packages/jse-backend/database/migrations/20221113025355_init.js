/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id');
    table.string('jobTitle').notNullable()
    table.string('companyName').notNullable()
    table.string('companyLocation').notNullable()
    table.specificType('salaryInfo', 'text ARRAY');
    table.string('snippet').notNullable()
    table.string('detailLink').notNullable()
    table.string('jobId').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('jobs')
};