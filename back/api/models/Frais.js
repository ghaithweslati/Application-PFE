const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Frais = sequelize.define("frais", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  duree: { type: Sequelize.INTEGER, allowNull: false },
  prix: { type: Sequelize.INTEGER, allowNull: false }
});

module.exports = Frais;
