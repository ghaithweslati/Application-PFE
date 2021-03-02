const { validationResult } = require("express-validator");

const Product = require("../models/Product");
const factory = require("./handlerFactory");

exports.getAllProducts = (req, res, next) => {
  // Pagination
  // const currentPage = req.query.page || 1;
  // const perPage = 100;
  // const offset = (currentPage - 1) * perPage;
  // const limit = offset + perPage;

  let totalItems;

  Product.findAndCountAll({
    // limit,
    // offset
  })
    .then((result) => {
      totalItems = result.count;
      res.status(200).json({
        message: "Fetched Products Successfully.",
        products: result.rows,
        totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductsByCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;

  // Pagination
  // const currentPage = req.query.page || 1;
  // const perPage = 100;
  // const offset = (currentPage - 1) * perPage;
  // const limit = offset + perPage;

  let totalItems;

  Product.findAndCountAll({
    where: { categoryId: categoryId },
    // limit,
    // offset
  })
    .then((result) => {
      totalItems = result.count;
      res.status(200).json({
        message:
          "Fetched Products by category Successfully. categoryId: " +
          categoryId,
        products: result.rows,
        totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// DONE: adding check if the user have this products
exports.getAllBrands = async (req, res, next) => {
  const doc = await Product.aggregate('brand', 'DISTINCT', { plain: false });

  if (!doc) {
    res.status(404).json({
      status: "fail",
      message: "brands not found",
    });
  }

  res.status(200).json({
    status: `Fetched All Brands Successfully.`,
    data: doc.map(row => (row.DISTINCT)),
  });
};
exports.getAllProductsOrProductsByCategoryId = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);

// Create a list of products through a json file
exports.createManyProducts = async (req, res, next) => {
  console.log(req.body);

  let docs = [];
  const products = req.body;
  products.forEach(product => {
    const doc = Product.create(product);
    docs.push(doc);
  });

  if (docs.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "products not created",
    });
  }

  res.status(200).json({
    status: `Fetched Products Created Successfully.`,
    data: docs,
  });

};

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
