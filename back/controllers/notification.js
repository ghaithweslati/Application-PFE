const Notification = require("../models/Notification");
const factory = require("./handlerFactory");

exports.createNotification = factory.createOne(Notification);
exports.getAllNotification = factory.getAll(Notification);
exports.updateNotification = factory.updateOne(Notification);


