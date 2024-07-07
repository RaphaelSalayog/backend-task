import { DataTypes } from "sequelize";
import sequelize from "../db/sequalize";

const users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users_tb",
    timestamps: false,
  }
);

sequelize.sync();

export default users;
