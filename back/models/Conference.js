const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Seance = require("./Seance");


class Conference extends Seance {
    constructor() {
        super();
        this.type = {
            type: Sequelize.ENUM,
            values: ['Gratuit', 'Payant']
        };
    }
}

const conference = sequelize.define('conference', new Conference);

module.exports = conference;