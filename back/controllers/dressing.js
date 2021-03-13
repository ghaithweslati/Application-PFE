const { validationResult } = require("express-validator");
const { normalize } = require("../utils/normalize");

const Dressing = require("../models/Dressing");
const factory = require("./handlerFactory");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// exports.getDressingsByCustomer = (req, res, next) => {
//   const customerId = req.params.customerId;
//   // Pagination and search
//   const currentPage = req.query.page || 1;
//   const perPage = req.query.perPage || 10;
//   const searchQuery = (req.query.search && normalize(req.query.search)) || "";
//   const offset = (currentPage - 1) * perPage;
//   const limit = offset + perPage;

//   let totalItems;

//   Dressing.findAndCountAll({
//     where: {
//       userId: req.user.id,
//       customerId: customerId,
//       name: { [Op.like]: searchQuery + "%" },
//     },
//     limit,
//     offset,
//   })
//     .then((result) => {
//       totalItems = result.count;
//       res.status(200).json({
//         message:
//           "Fetched Dressings by Customer Successfully. customerId: " +
//           customerId,
//         dressings: result.rows,
//         totalItems: totalItems,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.getAllDressings = (req, res, next) => {
//   // Pagination and search
//   const currentPage = req.query.page || 1;
//   const perPage = req.query.perPage || 10;
//   const searchQuery = (req.query.search && normalize(req.query.search)) || "";
//   const offset = (currentPage - 1) * perPage;
//   const limit = offset + perPage;

//   let totalItems;

//   Dressing.findAndCountAll({
//     where: { userId: req.user.id, name: { [Op.like]: searchQuery + "%" } },
//     limit,
//     offset,
//   })
//     .then((result) => {
//       totalItems = result.count;
//       res.status(200).json({
//         message: "Fetched All Dressings Successfully.",
//         dressings: result.rows,
//         totalItems,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// TODO: adding check if the user have this Dressings
exports.getDressingByCustomerId = factory.getOne(Dressing);
// DONE: adding check if the user have this Dressings
exports.getDressingsByCustomer = factory.getAll(Dressing);
exports.getAllDressings = factory.getAll(Dressing);
exports.createDressing = factory.createOne(Dressing);
exports.updateDressing = factory.updateOne(Dressing);
exports.deleteDressing = factory.deleteOne(Dressing);
