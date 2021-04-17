const Expert = require("../models/Expert");
const factory = require("./handlerFactory");

exports.getAllExpert = factory.getAll(Expert);
exports.updateExpert = factory.updateOne(Expert);