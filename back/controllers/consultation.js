const Consultation = require("../models/Consultation");
const factory = require("./handlerFactory");

exports.createConsultation = factory.createOne(Consultation);
exports.getAllConsultation = factory.getAll(Consultation);
