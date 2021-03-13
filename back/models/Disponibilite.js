const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Disponibilite = sequelize.define("disponibilite", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Disponibilite;
