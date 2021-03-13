const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Utilisateur = require("./Utilisateur");


class Expert extends Utilisateur {
    constructor() {
        super();
        this.specialite = {
            type: Sequelize.STRING,
            allowNull: false
        };
    }
}

const expert = sequelize.define('expert', new Expert());

module.exports = expert;