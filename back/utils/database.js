const Sequelize = require("sequelize");

// database credentials should be saved in environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DEFAULT_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: "3306",
  }
);

module.exports = sequelize;
