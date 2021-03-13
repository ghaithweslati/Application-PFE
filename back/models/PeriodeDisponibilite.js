const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Periode = require("./Periode");


class PeriodeDisponibilite extends Periode {
    constructor() {
        super();
    }
}

const periodeDisponibilite = sequelize.define('periode_disponibilite', new PeriodeDisponibilite());

module.exports = periodeDisponibilite;