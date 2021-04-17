const Consultation = require("../models/Consultation");
const factory = require("./handlerFactory");

exports.createConsultation = factory.createOne(Consultation);
exports.getAllConsultation = factory.getAll(Consultation);
exports.getOneConsultation = factory.getOne(Consultation);
exports.updateConsultation = factory.updateOne(Consultation);