import { Router } from "express";
//import { userService } from "../repositories/index.js";
import { AuthClass } from "../controlers/auth.controler.js";
import passport from "passport";
import { authToken } from "../utils/jsonwt.js";
const authClass = new AuthClass();

const router = Router();

router.get("/login", authClass.navLogIn);

router.post("/login", authClass.LogIn);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products");
  }
);

router.get("/register", authClass.navRegister);

router.post("/register", authClass.Register);

router.get("/sendrecoverymail", authClass.navSendRecoveryMail);

router.post("/sendrecoverymail", authClass.sendRecoveryMail);

router.get("/recoverpass/:tk", authClass.navRecoverPass);

router.post("/recoverpass", authToken, authClass.RestorePwd);

// router.post("/restorepass", authClass.RestorePwd);

router.get("/loggerTest", authClass.TestLog);

router.get("/logout", authClass.LogOut);

export default router;