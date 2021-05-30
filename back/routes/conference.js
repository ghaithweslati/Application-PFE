const express = require("express");
const { body } = require("express-validator");

const conferenceController = require("../controllers/conference");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();


// GET /sujet
router.get(
  "/detail/:conferenceId",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  conferenceController.getOneConference
);


router.get(
  "/all/:role",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  conferenceController.getAllConference
);


router.get(
  "/:dateDeb/:dateFin",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  conferenceController.getAllConference
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  conferenceController.createConference
);


// GET /sujet
router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  conferenceController.updateConference
);




router.get(
  "/:dateDeb/:dateFin",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  conferenceController.getAllConference
);


module.exports = router;
