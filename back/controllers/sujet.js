const Sujet = require("../models/Sujet");
const factory = require("./handlerFactory");

exports.getAllSujet = factory.getAll(Sujet);
exports.createSujet = factory.createOne(Sujet);
exports.deleteSujet = factory.deleteOne(Sujet);
exports.getSujet = factory.getOne(Sujet);
