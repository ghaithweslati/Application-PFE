const { validationResult } = require("express-validator");

const Look = require("../models/Look");
const Product = require("../models/Product");
const producItems = require("../models/product-item");
const factory = require("./handlerFactory");

// exports.getAllLooks = (req, res, next) => {
//   const dressingId = req.params.dressingId;
//   // Pagination
//   // const currentPage = req.query.page || 1;
//   // const perPage = 100;
//   // const offset = (currentPage - 1) * perPage;
//   // const limit = offset + perPage;
//   let totalItems;

//   // Get all orders
//   Look.findAll({
//     where: { userId: req.user.id, dressingId: dressingId },
//     // limit,
//     // offset,
//     attributes: ["id", "name"],
//     // Make sure to include the products
//     include: [
//       {
//         model: Product,
//         as: "products",
//         required: false,
//         // Pass in the Product attributes that you want to retrieve
//         attributes: [
//           "id",
//           "name",
//           "ref",
//           "brand",
//           "price",
//           "imageUrl",
//           "categoryId",
//         ],
//         through: {
//           // This block of code allows you to retrieve the properties of the join table
//           model: producItems,
//           as: "productItem",
//           attributes: ["id", "lookId", "productId"],
//         },
//       },
//     ],
//   })
//     .then((looks) => {
//       res.status(200).json({
//         message:
//           "Fetched Looks by Dressing Successfully. dressingId: " + dressingId,
//         looks: looks,
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

exports.getLookById = (req, res, next) => {
  const lookId = req.params.lookId;

  // Get look
  Look.findAll({
    where: { id: lookId },
    attributes: ["id", "name"],
    // Make sure to include the products
    include: [
      {
        model: Product,
        as: "products",
        required: false,
        // Pass in the Product attributes that you want to retrieve
        attributes: [
          "id",
          "name",
          "ref",
          "brand",
          "price",
          "imageUrl",
          "categoryId",
        ],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: producItems,
          as: "productItem",
          attributes: ["id", "lookId", "productId"],
        },
      },
    ],
  })
    .then((look) => {
      res.status(200).json({
        message: "Fetched Look by Id Successfully. lookId: " + lookId,
        look: look,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.deleteLook = (req, res, next) => {
//   const lookId = req.params.lookId;
//   const dressingId = req.params.dressingId;
//   let totalItems;

//   // delete a product item by id
//   Look.findByPk(lookId)
//     .then((look) => {
//       if (!look) {
//         const error = new Error(
//           "Could not find this item with the id " + lookId
//         );
//         error.statusCode = 404;
//         throw error;
//       }
//       return look.destroy();
//     })
//     .then(async (result) => {
//       return Look.findAll({
//         where: { userId: req.user.id, dressingId: dressingId },
//         // limit,
//         // offset,
//         attributes: ["id", "name"],
//         // Make sure to include the products
//         include: [
//           {
//             model: Product,
//             as: "products",
//             required: false,
//             // Pass in the Product attributes that you want to retrieve
//             attributes: [
//               "id",
//               "name",
//               "ref",
//               "brand",
//               "price",
//               "imageUrl",
//               "categoryId",
//             ],
//             through: {
//               // This block of code allows you to retrieve the properties of the join table
//               model: producItems,
//               as: "productItem",
//               attributes: ["id", "lookId", "productId"],
//             },
//           },
//         ],
//       });
//     })
//     .then((looks) => {
//       res.status(200).json({
//         message: "Removed Look Successfully. lookId: " + lookId,
//         looks: looks,
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

// TODO: adding check if the user have this Looks
exports.getAllLooksOrLooksByDressingId = factory.getAll(Look);
exports.getLook = factory.getOne(Look);
exports.createLook = factory.createOne(Look);
exports.updateLook = factory.updateOne(Look);
exports.deleteLook = factory.deleteOne(Look);
