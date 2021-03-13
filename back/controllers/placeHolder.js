const PlaceHolder = require("../models/PlaceHolder");
const factory = require("./handlerFactory");

exports.getAllPlaceHolders = factory.getAll(PlaceHolder);
exports.getPlaceHolder = factory.getOne(PlaceHolder);
exports.createPlaceHolder = factory.createOne(PlaceHolder);
exports.updatePlaceHolder = factory.updateOne(PlaceHolder);
exports.deletePlaceHolder = factory.deleteOne(PlaceHolder);
