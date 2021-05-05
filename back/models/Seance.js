const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

/*const Duree = sequelize.define("seance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dureeEffectif: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = Duree;*/



class Seance {
  constructor() {
    this.id = {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    };
    this.dureeEffectif = { type: Sequelize.INTEGER, allowNull: true };
    this.status = { type: Sequelize.ENUM, values: ['NonCommence', 'EnCours', 'Cloture'] };
  }

}

module.exports = Seance;


