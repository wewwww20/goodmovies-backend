import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Watchlists', 'movie_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Watchlists', 'movie_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
