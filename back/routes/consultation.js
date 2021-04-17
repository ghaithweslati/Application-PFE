const express = require("express");
const { body } = require("express-validator");

const consultationController = require("../controllers/consultation");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /periode/
router.get(
  "/all/:role",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  consultationController.getAllConsultation
);


// GET /sujet
router.get(
  "/detail/:consultationId",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  consultationController.getOneConsultation
);



router.get(
  "/:dateDeb/:dateFin",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  consultationController.getAllConsultation
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
  consultationController.createConsultation
);


router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  consultationController.updateConsultation
);


module.exports = router;
