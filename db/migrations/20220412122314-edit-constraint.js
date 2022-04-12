/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    ADD not_archived VARCHAR(255) AS (CONCAT(email, '|' , IFNULL(deleted_at, ''))) UNIQUE;
  `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Users
    DROP COLUMN not_archived;
  `);
  },
};
