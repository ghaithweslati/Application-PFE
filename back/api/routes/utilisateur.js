const express = require("express");
const { body } = require("express-validator");

const utilisateurController = require("../controllers/utilisateur");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

// GET /utilisateur/utilisateurs/:page
router.get(
  "/",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  utilisateurController.getAllUtilisateur
);

// POST /utilisateur/utilisateur
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
  utilisateurController.createUtilisateur
);

// GET /utilisateur/utilisateur/utilisateurId
router.get(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  utilisateurController.getUtilisateur
);

// GET /utilisateur/utilisateur
router.get(
  "/",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  utilisateurController.getUtilisateur
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
  passport.authenticate("jwt", { session: false }),
  utilisateurController.updateUtilisateur
);

// DELETE /utilisateur/utilisateur/utilisateurId
router.delete(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  utilisateurController.deleteUtilisateur
);

module.exports = router;
