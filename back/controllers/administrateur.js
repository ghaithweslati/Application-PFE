const Administrateur = require("../models/Administrateur");
const factory = require("./handlerFactory");

exports.getAllAdministrateur = factory.getAll(Administrateur);
exports.updateAdminstrateur = factory.updateOne(Administrateur);
