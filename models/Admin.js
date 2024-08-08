import { DataTypes } from 'sequelize';
import db from '../config/conn.js';

const Admin = db.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin',
  },
});

export default Admin;
