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




// POST /utilisateur/utilisateur
router.post(
  "/",
  //passport.authenticate("jwt", { session: false }),
  domaineController.createDomaine
);



// PUT /utilisateur/utilisateur/utilisateurId
router.put(
  "/:id",
  // isAuth,
  /*[
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("phoneNumber").trim().isLength({ min: 5 }),
  ],*/
  // passport.authenticate("jwt", { session: false }),
  domaineController.updateDomaine
);

// DELETE /utilisateur/utilisateur/utilisateurId
router.delete(
  "/:id",
  // isAuth
  // passport.authenticate("jwt", { session: false }),
  domaineController.deleteDomaine
);


module.exports = router;
