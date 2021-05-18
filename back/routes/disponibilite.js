const express = require("express");
const { body } = require("express-validator");

const disponibiliteController = require("../controllers/disponibilite");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /disponibilite/
router.get(
  "/:dateDeb/:dateFin/:utilisateurId",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  disponibiliteController.getAllDisponibilite
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
  disponibiliteController.createDisponibilite
);


// DELETE /disponibilite/disponibiliteId
router.delete(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  disponibiliteController.deleteDisponibilite
);


module.exports = router;
