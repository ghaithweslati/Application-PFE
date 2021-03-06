const express = require("express");
const { body } = require("express-validator");

const paiementController = require("../controllers/paiement");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();


router.post(
  "/",
  // isAuth,
  /*  [
      body("firstName").trim().not().isEmpty(),
      body("lastName").trim().not().isEmpty(),
      body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),
      body("phoneNumber").trim().isLength({ min: 8 }),
    ],*/
  //passport.authenticate("jwt", { session: false }),
  paiementController.payer
);


module.exports = router;
