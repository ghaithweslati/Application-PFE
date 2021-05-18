const express = require("express");
const { body } = require("express-validator");

const compte = require("../models/Compte");
const compteController = require("../controllers/compte");

const router = express.Router();


router.post("/", compteController.getCompte);

router.put(
    "/:id",
    // isAuth
    compteController.updateCompte
);

module.exports = router;
