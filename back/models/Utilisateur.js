const Sequelize = require("sequelize");


class Utilisateur {
  constructor() {
    this.id = {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    };
    this.nom = { type: Sequelize.STRING, allowNull: false };
    this.prenom = { type: Sequelize.STRING, allowNull: false };
    this.email = { type: Sequelize.STRING, allowNull: false };
    this.hash = { type: Sequelize.STRING, allowNull: false };
    this.salt = { type: Sequelize.STRING, allowNull: false };
    this.etat = { type: Sequelize.ENUM, values: ['Actif', 'Banni'] };
    this.photo = { type: Sequelize.TEXT, allowNull: true };

  }

}

module.exports = Utilisateur;



