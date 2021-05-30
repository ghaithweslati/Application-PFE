const Compte = require("../models/Compte");
const factory = require("./handlerFactory");

exports.createCompte = factory.createOne(Compte);