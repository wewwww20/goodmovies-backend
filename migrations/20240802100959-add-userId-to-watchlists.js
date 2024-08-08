import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Watchlists', 'userId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Watchlists', 'userId');
  },
};
