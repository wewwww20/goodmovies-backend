const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'watchlistId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Watchlists',
        key: 'id',
      },
    });

    await queryInterface.removeColumn('Watchlists', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'watchlistId');

    await queryInterface.addColumn('Watchlists', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },
};
