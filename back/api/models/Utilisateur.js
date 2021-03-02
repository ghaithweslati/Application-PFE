const Sequelize = require("sequelize");

const sequelize = require("../utils/database");


class Utilisateur {
  constructor() {
    this.id = {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    };
    this.username = { type: Sequelize.STRING, allowNull: false };
    this.nom = { type: Sequelize.STRING, allowNull: false };
    this.prenom = { type: Sequelize.STRING, allowNull: false };
    this.email = { type: Sequelize.STRING, allowNull: false };
    this.hash = { type: Sequelize.STRING, allowNull: false };
    this.salt = { type: Sequelize.STRING, allowNull: false };
    /*  this.role = {
        type: Sequelize.STRING,
        default: "Demandeur",
        enum: ["Admin", "Expert", "Demandeur"],
        allowNull: false,
      };*/
    this.photo = { type: Sequelize.STRING, allowNull: true };

  }

}

module.exports = Utilisateur;



