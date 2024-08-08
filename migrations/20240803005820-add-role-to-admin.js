import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Admins', 'role', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Admins', 'role');
  },
};
