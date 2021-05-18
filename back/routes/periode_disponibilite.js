const express = require("express");
const { body } = require("express-validator");

const periodeDisponibiliteController = require("../controllers/periode_disponibilite");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /disponibilite/
router.get(
  "/:expertId",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  periodeDisponibiliteController.getAllDisponibilite
);

// GET /disponibilite/
router.get(
  "/",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  periodeDisponibiliteController.getAllDisponibilite
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
  periodeDisponibiliteController.createDisponibilite
);


router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  periodeDisponibiliteController.updateDisponibilite
);




router.delete(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  periodeDisponibiliteController.deleteDisponibilite
);




module.exports = router;
