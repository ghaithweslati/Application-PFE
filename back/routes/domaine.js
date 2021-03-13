const express = require("express");
const { body } = require("express-validator");

const domaineController = require("../controllers/domaine");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /disponibilite/
router.get(
  "/",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  domaineController.getAllDomaine
);

module.exports = router;
