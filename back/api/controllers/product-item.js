const { validationResult } = require("express-validator");

const getLook = require("../utils/getLook");

const ProductItem = require("../models/product-item");
const factory = require("./handlerFactory");

exports.deleteProductItem = (req, res, next) => {
  const productItemId = req.params.productItemId;
  const lookId = req.params.lookId;

  // delete a product item by id
  ProductItem.findByPk(productItemId)
    .then((productItem) => {
      if (!productItem) {
        const error = new Error(
          "Could not find this item with the id " + productItem
        );
        error.statusCode = 404;
        throw error;
      }
      return productItem.destroy();
    })
    .then(async (result) => {
      let look;
      let promise;
      promise = getLook(lookId);
      promise
        .then(function (value) {
          res.status(200).json({
            message: "Item with id: " + productItemId + " is deleted",
            look: value,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProductItem = (req, res, next) => {
  const productItemId = req.params.productItemId;

  const lookId = req.body.lookId;
  const productId = req.body.productId;
  // update a product item by id
  ProductItem.findByPk(productItemId)
    .then((productItem) => {
      if (!productItem) {
        const error = new Error(
          "Could not find this item with the id " + productItemId
        );
        error.statusCode = 404;
        throw error;
      }
      productItem.lookId = lookId;
      productItem.productId = productId;
      return productItem.save();
    })
    .then(async (result) => {
      let promise;
      promise = getLook(lookId);
      promise
        .then(function (value) {
          res.status(200).json({
            message: "Item with id: " + productItemId + " is updated",
            look: value,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProductItem = (req, res, next) => {
  const lookId = req.body.lookId;
  const productId = req.body.productId;

  // add new productItem
  ProductItem.create({ lookId: lookId, productId: productId })
    .then(async (result) => {
      let promise;
      promise = getLook(lookId);
      promise
        .then(function (value) {
          res.status(201).json({
            message: "ProductItem created successfully!",
            look: value,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProductItems = (req, res, next) => {
  const lookId = req.body.lookId;
  const products = req.body.products;

  console.log(products);

  products.map((product) => {
    // add new productItem
    ProductItem.create({ lookId: lookId, productId: product.id })
      .then(async (result) => {
        let promise;
        promise = getLook(lookId);
        promise
          .then(function (value) {
            res.status(201).json({
              message: "ProductItem created successfully!",
              look: value,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.deleteProductItemBylookIdAndproductId = factory.deleteOne(ProductItem);
