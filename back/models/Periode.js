const Sequelize = require("sequelize");

const sequelize = require("../utils/database");


class Periode {
  constructor() {
    this.id = {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    };
    this.dateDeb = { type: Sequelize.STRING, allowNull: false };
    this.dateFin = { type: Sequelize.STRING, allowNull: false }
  }

}

module.exports = Periode;



