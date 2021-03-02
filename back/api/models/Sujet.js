const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Sujet = sequelize.define("sujet", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titre: { type: Sequelize.STRING, allowNull: true },
  description: { type: Sequelize.STRING, allowNull: true }
});

module.exports = Sujet;
