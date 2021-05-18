const PeriodeDisponibilite = require("../models/PeriodeDisponibilite");
const factory = require("./handlerFactory");

exports.getAllDisponibilite = factory.getAll(PeriodeDisponibilite);
exports.createDisponibilite = factory.createOne(PeriodeDisponibilite);
exports.deleteDisponibilite = factory.deleteOne(PeriodeDisponibilite);
exports.updateDisponibilite = factory.updateOne(PeriodeDisponibilite);