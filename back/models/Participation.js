const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Participation = sequelize.define('participation')


module.exports = Participation;