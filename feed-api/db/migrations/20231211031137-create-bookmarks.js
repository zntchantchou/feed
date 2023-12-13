'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Bookmarks',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        userId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        articleId: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: 'Articles',
            key: 'uid',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          'articleId-userId': {
            customIndex: true,
            fields: ['articleId', 'userId'],
          },
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookmarks');
  },
};
