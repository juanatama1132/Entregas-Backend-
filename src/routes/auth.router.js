import { Router } from "express";
import { AuthClass } from "../controlers/auth.controler.js";

import passport from "passport";
import { authToken } from "../utils/jsonwt.js";
const authClass = new AuthClass();

const router = Router();

router
  .get("/login", authClass.navLogIn)

  .post("/login", authClass.LogIn)

  .get("/github", passport.authenticate("github", { scope: ["user:email"] }))

  .get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      req.session.user = req.user;
      res.redirect("/api/products");
    }
  )

  .get("/register", authClass.navRegister)

  .post("/register", authClass.Register)

  .get("/sendrecoverymail", authClass.navSendRecoveryMail)

  .post("/sendrecoverymail", authClass.sendRecoveryMail)

  .get("/recoverpass/:tk", authClass.navRecoverPass)

  .post("/recoverpass", authToken, authClass.RestorePwd)

  // router.post("/restorepass", authClass.RestorePwd);

  .get("/loggerTest", authClass.TestLog)

  .get("/logout", authClass.LogOut);

export default router;