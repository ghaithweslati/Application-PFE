const PeriodeSeance = require("../models/PeriodeSeance");
const factory = require("./handlerFactory");

exports.createPeriodeSeance = factory.createOne(PeriodeSeance);
