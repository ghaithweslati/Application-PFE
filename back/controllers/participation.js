const Participation = require("../models/Participation");
const factory = require("./handlerFactory");

exports.createParticipation = factory.createOne(Participation);




