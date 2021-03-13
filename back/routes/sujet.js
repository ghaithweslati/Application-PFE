const express = require("express");
const { body } = require("express-validator");

const sujetController = require("../controllers/sujet");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();



// GET /sujet/
router.get(
  "/:role/:id",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  sujetController.getAllSujet
);

// GET /sujet
router.get(
  "/:sujetId",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  sujetController.getSujet
);

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
  passport.authenticate("jwt", { session: false }),
  sujetController.createSujet
);


// DELETE 
router.delete(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  sujetController.deleteSujet
);

module.exports = router;
