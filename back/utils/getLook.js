const Look = require("../models/Look");
const Product = require("../models/Product");
const producItems = require("../models/product-item");

const getLook = lookId => {
  var look = new Promise(function (resolve, reject) {
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
            "categoryId"
          ],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: producItems,
            as: "productItem",
            attributes: ["id", "lookId", "productId"]
          }
        }
      ]
    })
      .then(lookData => {
        resolve(lookData);
      })
      .catch(err => {
        reject(err);
      });
  });
  return look;
};

module.exports = getLook;
