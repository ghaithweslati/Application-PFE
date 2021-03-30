const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Seance = require("./Seance");


class Consultation extends Seance {
    constructor() {
        super();
        this.note = {
            type: Sequelize.INTEGER,
        };
    }
}

const consultation = sequelize.define('consultation', new Consultation);

module.exports = consultation;