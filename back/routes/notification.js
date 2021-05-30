const express = require("express");
const { body } = require("express-validator");

const notificationController = require("../controllers/notification");
const isAuth = require("../middleware/is-auth");
const passport = require("passport");

const router = express.Router();

router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  notificationController.createNotification
);

router.get(
  "/",
  // isAuth,
  passport.authenticate("jwt", { session: false }),
  notificationController.getAllNotification
);


router.put(
  "/:id",
  // isAuth
  passport.authenticate("jwt", { session: false }),
  notificationController.updateNotification
);



module.exports = router;
