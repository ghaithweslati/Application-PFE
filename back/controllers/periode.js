const Periode = require("../models/Periode");
const factory = require("./handlerFactory");

exports.getAllPeriode = factory.getAll(Periode);
exports.createPeriode = factory.createOne(Periode);
exports.updatePeriode = factory.updateOne(Periode);
exports.deletePeriode = factory.deleteOne(Periode);
