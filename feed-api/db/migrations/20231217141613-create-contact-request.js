'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ContactRequests',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        senderId: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        receiverId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: 'PENDING',
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
          'senderId-receiverId': {
            customIndex: true,
            fields: ['senderId', 'receiverId'],
          },
        },
      },
    );
  },
};
