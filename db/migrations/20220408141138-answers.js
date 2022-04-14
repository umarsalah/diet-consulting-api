'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Answers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        question_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Questions',
            key: 'id',
          },
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        recommendations: {
          type: Sequelize.STRING,
        },
        answer_time: {
          type: Sequelize.DATE,
          defaultValue: '1000-01-01 00:00:00',
        },
        is_draft: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        created_by: {
          type: Sequelize.STRING,
        },
        updated_by: {
          type: Sequelize.STRING,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
        deleted_by: {
          type: Sequelize.STRING,
        },
      },
      {
        uniqueKeys: {
          unique_answers: {
            fields: ['question_id', 'user_id', 'answer_time'],
          },
        },
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Answers');
  },
};
