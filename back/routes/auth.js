const express = require("express");
const { body } = require("express-validator");

const User = require("../models/Utilisateur");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  /*[
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findAll({
          where: {
            email: value,
          },
        }).then((userTable) => {
          if (userTable.length) {
            console.log("userTable", userTable);
            return Promise.reject("EMAIL_ALREADY_EXISTS");
          }
        });
      }),
    // normalizedEmail(),
    body("password", "INVAILD_PASSWORD").trim().isLength({ min: 5 }),
    body("name", "INVALID_NAME").trim().not().isEmpty(),
  ],*/
  authController.signup
);

// router.post(
//   "/signupWithAzureAd",
//   [
//     body("email")
//       .isEmail()
//       .withMessage("Please enter a valid email.")
//       .custom((value, { req }) => {
//         return User.findAll({
//           where: {
//             email: value,
//           },
//         }).then((userTable) => {
//           if (userTable.length) {
//             console.log("userTable", userTable);
//             return Promise.reject("EMAIL_ALREADY_EXISTS");
//           }
//         });
//       }),
//     body("name", "INVALID_NAME").trim().not().isEmpty(),
//   ],
//   authController.signupWithAzureAd
// );

router.post("/login", authController.login);

module.exports = router;
