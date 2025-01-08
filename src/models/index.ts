import { Sequelize,DataTypes } from 'sequelize';
require("dotenv").config();

interface DB {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
    Users?: ReturnType<typeof sequelize.define>;
  }
  

const config =
  require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );

  const db: DB = {
    Sequelize,
    sequelize,
  };
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.Users = require("./user")(sequelize, DataTypes);

  module.exports = db;