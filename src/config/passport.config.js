import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy; // core de la estrategia de jwt
const ExtractJWT = jwt.ExtractJwt; // Extractor de jwt ya sea de headers, cookie, etc

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    // corroboramos que hay alguna cookie que tomar
    token = req.cookies["coderCookieToken"]; // tomamos solo la cookie que necesitamos
    // console.log('cookie extractor',req.cookies)
  }
  console.log("token: ", token);
  return token;
};
const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "CoderKeyQueFuncionaComoUnSecret", // Corrobora qeu sea el mimso secret que app.js
      },
      async (jwt_payload, done) => {
        try {
          //  buscar el usuario
          // if (!user) {
          //     return done(null, false, {message: 'No user found'})
          // }
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export { initializePassport };
