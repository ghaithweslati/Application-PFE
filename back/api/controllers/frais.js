const Frais = require("../models/Frais");
const factory = require("./handlerFactory");

exports.getAllFrais = factory.getAll(Frais);
exports.createFrais = factory.createOne(Frais);
/*exports.updateFrais  = factory.updateOne(Frais);
exports.deleteFrais  = factory.deleteOne(Frais);*/
