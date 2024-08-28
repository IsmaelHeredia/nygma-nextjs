import { Model, DataTypes } from "sequelize";
import sequelize from "../db_connection";

class Document extends Model {
  declare id: number;
  declare name: string;
  declare content: string;
  declare key: string;
  declare iv: string;
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    key: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    iv: {
      type: new DataTypes.JSON(),
      allowNull: false,
    },
  },
  {
    tableName: "documents",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Document;