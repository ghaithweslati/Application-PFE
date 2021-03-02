const Utilisateur = require("../models/Utilisateur");
const factory = require("./handlerFactory");

exports.getAllUtilisateur = factory.getAll(Utilisateur);
exports.getUtilisateur = factory.getOne(Utilisateur);
exports.createUtilisateur = factory.createOne(Utilisateur);
exports.updateUtilisateur = factory.updateOne(Utilisateur);
exports.deleteUtilisateur = factory.deleteOne(Utilisateur);
