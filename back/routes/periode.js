const express = require("express");
const { body } = require("express-validator");

const periodeController = require("../controllers/periode");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /periode/
router.get(
  "/:disponibiliteId",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  periodeController.getAllPeriode
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
  periodeController.createPeriode
);

// DELETE /periode/periodeId
router.delete(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  periodeController.deletePeriode
);

// PUT /periode/periodeId
router.put(
  "/:id",
  // isAuth,
  /*[
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("phoneNumber").trim().isLength({ min: 5 }),
  ],*/
  passport.authenticate("jwt", { session: false }),
  periodeController.updatePeriode
);

module.exports = router;
