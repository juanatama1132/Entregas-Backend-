import passport from "passport";
import GithubStrategy from "passport-github2";
import UserModel from "../models/user.model.js";

function initializePassport() {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.3bc0d4f119dbc5d9",
        clientSecret: "1e3789e93293d68f1f7a662ef010f2f17a6dc799",
        callbackURL: "http://localhost:8080/api/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile: ", profile);
        try {
          let user = await UserModel.findOne({ email: profile._json.email });

          if (!user) {
            let newUser = {
              first_name: profile.username,
              last_name: profile.username,
              email: "federico@gmail.com",
              password: "",
            };
            let result = await UserModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}

module.exports = {
  initializePassport,
};