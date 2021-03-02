const { validationResult } = require("express-validator");
const { normalize } = require("../utils/normalize");

const Customer = require("../models/Customer");
const factory = require("./handlerFactory");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// exports.getCustomers = (req, res, next) => {
//   // Pagination and search
//   const currentPage = req.query.page || 1;
//   const perPage = parseInt(req.query.perPage) || 10;
//   const searchQuery = (req.query.search && normalize(req.query.search)) || "";
//   const offset = (currentPage - 1) * perPage;
//   const limit = offset + perPage;

//   let totalItems;
//   Customer.findAndCountAll({
//     where: {
//       userId: req.user.id,
//       [Op.or]: [
//         { firstName: { [Op.like]: searchQuery + "%" } },
//         { lastName: { [Op.like]: searchQuery + "%" } },
//       ],
//     },
//     limit,
//     offset,
//   })
//     .then((result) => {
//       totalItems = result.count;
//       res.status(200).json({
//         message: "Fetched Customers Successfully.",
//         customers: result.rows,
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

// DONE: adding check if the user have this customers
exports.getCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.createCustomer = factory.createOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);
