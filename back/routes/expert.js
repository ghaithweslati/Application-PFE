const express = require("express");
const { body } = require("express-validator");

const expertController = require("../controllers/expert");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /utilisateur/utilisateurs/:page
router.get(
  "/",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  expertController.getAllExpert
);

router.get(
  "/:domaineId",
  // isAuth,
  //passport.authenticate("jwt", { session: false }),
  expertController.getAllExpert
);

router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  expertController.updateExpert
);


module.exports = router;
