const express = require("express");
const { body } = require("express-validator");

const demandeurController = require("../controllers/demandeur");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /utilisateur/utilisateurs/:page
router.get(
  "/",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  demandeurController.getAllDemandeur
);

router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  demandeurController.updateDemandeur
);

module.exports = router;
