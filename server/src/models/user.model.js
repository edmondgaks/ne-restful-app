import { sequelize } from '../utils/database.js';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    selectable: false,
  }
},{
    timestamps:true,
    tableName: "users"
  },
);
sequelize.sync(
    { force: false }
)
    .catch((error) => {
        console.error('Error creating tables:', error)
})

export default UserModel