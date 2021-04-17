const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Utilisateur = require("./Utilisateur");


class Administrateur extends Utilisateur {
    constructor() {
        super();
    }
}

const administrateur = sequelize.define('administrateur', new Administrateur());

module.exports = administrateur;