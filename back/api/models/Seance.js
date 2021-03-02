const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Duree = sequelize.define("seance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dureeEffectif: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = Duree;
