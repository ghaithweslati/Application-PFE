const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Utilisateur = require("./Utilisateur");


class Demandeur extends Utilisateur {
    constructor() {
        super();
    }
}

const demandeur = sequelize.define('demandeur', new Demandeur());

module.exports = demandeur;