const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Periode = require("./Periode");


class PeriodeSeance extends Periode {
    constructor() {
        super();
    }
}

const periodeSeance = sequelize.define('periode_seance', new PeriodeSeance());

module.exports = periodeSeance;