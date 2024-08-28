import { Model, DataTypes } from "sequelize";
import sequelize from "../db_connection";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(),
    },
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;