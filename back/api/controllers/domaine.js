const Domaine = require("../models/Domaine");
const factory = require("./handlerFactory");

exports.getAllDomaine = factory.getAll(Domaine);
exports.getDomaine = factory.getOne(Domaine);
exports.createDomaine = factory.createOne(Domaine);
exports.updateDomaine = factory.updateOne(Domaine);
exports.deleteDomaine = factory.deleteOne(Domaine);
