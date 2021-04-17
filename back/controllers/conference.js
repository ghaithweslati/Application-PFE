const Conference = require("../models/Conference");
const factory = require("./handlerFactory");

exports.createConference = factory.createOne(Conference);
exports.getOneConference = factory.getOne(Conference);
exports.getAllConference = factory.getAll(Conference);
exports.updateConference = factory.updateOne(Conference);




