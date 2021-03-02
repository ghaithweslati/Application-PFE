const Disponibilite = require("../models/Disponibilite");
const factory = require("./handlerFactory");

exports.getAllDisponibilite = factory.getAll(Disponibilite);
exports.createDisponibilite = factory.createOne(Disponibilite);
exports.deleteDisponibilite = factory.deleteOne(Disponibilite);
