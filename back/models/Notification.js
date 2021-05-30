const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Notification = sequelize.define("notification", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  vu: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
  texte: { type: Sequelize.STRING, allowNull: true },
  date: { type: Sequelize.STRING, allowNull: true },

});

module.exports = Notification;
