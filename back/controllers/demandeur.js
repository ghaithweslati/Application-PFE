const Demandeur = require("../models/Demandeur");
const factory = require("./handlerFactory");

exports.getAllDemandeur = factory.getAll(Demandeur);
exports.updateDemandeur = factory.updateOne(Demandeur);