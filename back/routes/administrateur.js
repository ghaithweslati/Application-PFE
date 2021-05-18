const express = require("express");
const { body } = require("express-validator");

const administrateurController = require("../controllers/administrateur");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /utilisateur/utilisateurs/:page
router.get(
  "/",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  administrateurController.getAllAdministrateur
);

// GET /utilisateur/utilisateurs/:page
router.get(
  "/:id",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  administrateurController.getOneAdminstrateur
);


router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  administrateurController.updateAdminstrateur
);


module.exports = router;
