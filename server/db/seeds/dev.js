/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('demos').del();
  await knex('demos').insert([
    { first_name: 'rowValue1', last_name: 'rowValue1' },
    { first_name: 'rowValue2', last_name: 'rowValue2' },
  ]);
};
