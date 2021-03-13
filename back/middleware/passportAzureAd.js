var passport = require("passport");
var config = require("../utils/passportConfig");
var BearerStrategy = require("passport-azure-ad").BearerStrategy;

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
  identityMetadata:
    "https://login.microsoftonline.com/common/.well-known/openid-configuration",
  clientID: "343ba4b9-1007-46f6-a2ba-c7fbd9debb1a", // TODO: add comment
  validateIssuer: false,
  passReqToCallback: false,
  loggingLevel: config.creds.loggingLevel,
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  passport.use(
    new BearerStrategy(options, (token, done) => {
      // Send user info using the second argument
      done(null, {}, token);
    })
  );
};
