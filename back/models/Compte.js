const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Compte = sequelize.define("compte", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code: { type: Sequelize.INTEGER, allowNull: true },
  cle: { type: Sequelize.STRING, allowNull: true },

});

module.exports = Compte;
