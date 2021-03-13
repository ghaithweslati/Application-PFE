const Seance = require("../models/Seance");
const factory = require("./handlerFactory");

exports.createSeance = factory.createOne(Seance);
exports.getAllSeance = factory.getAll(Seance);
