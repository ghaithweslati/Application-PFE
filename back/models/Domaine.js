const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Sujet = sequelize.define("domaine", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nom: { type: Sequelize.STRING, allowNull: true },

});

module.exports = Sujet;
