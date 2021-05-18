const { validationResult } = require("express-validator");
const utils = require("../utils/utils");
const factory = require("./handlerFactory");

const Compte = require("../models/Compte");


exports.getCompte = (req, res, next) => {
  Compte.findOne({ where: { code: req.body.code } })
    .then((compte) => {
      if (!compte) {
        res.status(401).json({ success: false, msg: "Code du compte invalide!" });
      }
      else {
        const isValid = utils.validPassword(
          req.body.mdp,
          compte.hash,
          compte.salt
        );
        if (isValid) {

          res.status(200).json({
            success: true,
            compte: compte,
          });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "Mot de passe du compte incorrecte" });
        }

      }
    })
    .catch((err) => {
      next(err);
    });
}

exports.updateCompte = factory.updateOne(Compte);

