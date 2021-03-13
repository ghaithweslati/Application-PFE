const { validationResult } = require("express-validator");

const Demandeur = require("../models/Demandeur");
const Expert = require("../models/Expert");
const passport = require("passport");
const utils = require("../utils/utils");

exports.signup = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const role = req.body.role;
  var newUser;

  if (role == "Demandeur") {

    newUser = new Demandeur({
      username: req.body.username,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      photo: req.body.photo,
      hash: hash,
      salt: salt,
    });

  }
  else {
    newUser = new Expert({
      username: req.body.username,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      photo: req.body.photo,
      domaineId: req.body.domaineId,
      specialite: req.body.specialite,
      hash: hash,
      salt: salt,
    });

  }

  try {
    newUser.save().then((user) => {
      const tokenObject = utils.issueJWT(user);

      res.json({
        success: true,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

exports.login = (req, res, next) => {
  Expert.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        Demandeur.findOne({ where: { email: req.body.email } })
          .then((user) => {
            if (!user) {
              res.status(401).json({ success: false, msg: "could not find user" });
            }
            else {

              // Function defined at bottom of app.js
              const isValid = utils.validPassword(
                req.body.password,
                user.hash,
                user.salt
              );

              if (isValid) {
                const tokenObject = utils.issueJWT(user);

                res.status(200).json({
                  success: true,
                  user: user,
                  token: tokenObject.token,
                  expiresIn: tokenObject.expires,
                });
              } else {
                res
                  .status(401)
                  .json({ success: false, msg: "you entered the wrong password" });
              }

            }
          })
          .catch((err) => {
            next(err);
          });
      }
      else {

        // Function defined at bottom of app.js
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        );

        if (isValid) {
          const tokenObject = utils.issueJWT(user);

          res.status(200).json({
            success: true,
            user: user,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
          });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "you entered the wrong password" });
        }

      }
    })
    .catch((err) => {
      next(err);
    });
};

// exports.signup = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed.");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }
//   const email = req.body.email;
//   const name = req.body.name;
//   const password = req.body.password;
//   bcrypt
//     .hash(password, 12)
//     .then((hashedPw) => {
//       return User.create({
//         email: email,
//         password: hashedPw,
//         name: name,
//       });
//     })
//     .then((result) => {
//       const token = jwt.sign(
//         {
//           email: result.dataValues.email,
//           userId: result.dataValues.id.toString(),
//         },
//         "secretkey", // TODO: this should be stored in an environment variable when deployed
//         { expiresIn: "1 day" }
//       );
//       res.status(201).json({
//         message: "User Created",
//         token: token,
//         userId: result.id.toString(),
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;
//   User.findOne({ where: { email: email } })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("EMAIL_NOT_FOUND");
//         error.statusCode = 401;
//         throw error;
//       }
//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("WRONG_PASSWORD");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser.id.toString(),
//         },
//         "secretkey", // TODO: this should be stored in an environment variable when deployed
//         { expiresIn: "1 day" }
//       );
//       res.status(200).json({ token: token, userId: loadedUser.id.toString() });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.signupWithAzureAd = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed.");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }
//   const email = req.body.email;
//   const name = req.body.name;
//   const azureToken = req.body.azureToken;
//   const password = generator.generate({
//     length: 10,
//     numbers: true,
//   });
//   bcrypt
//     .hash(password, 12)
//     .then((hashedPw) => {
//       return User.create({
//         email: email,
//         password: hashedPw,
//         name: name,
//       });
//     })
//     .then((result) => {
//       res.status(201).json({
//         message: "User Created",
//         token: azureToken,
//         userId: result.id.toString(),
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.loginWithAzureAd = (req, res, next) => {
//   const email = req.body.email;
//   const azureToken = req.body.azureToken;

//   let loadedUser;
//   User.findOne({ where: { email: email } })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("EMAIL_NOT_FOUND");
//         error.statusCode = 401;
//         throw error;
//       }
//       loadedUser = user;

//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("WRONG_PASSWORD");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser.id.toString(),
//         },
//         "secretkey", // TODO: this should be stored in an environment variable when deployed
//         { expiresIn: "1 day" }
//       );
//       res.status(200).json({ token: token, userId: loadedUser.id.toString() });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
