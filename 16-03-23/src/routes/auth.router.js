import { Router } from "express";
import passport from "passport";
import UserModel from "../models/user.model";
import generateToken from "../utils/jsonwt.js";
import { createHash, isPwdValid } from "../utils/bCrypt.js";

const router = Router();
router.get("/login", async (req, res) => {
  res.status(200).render("login");
});

router.post("/login", async (req, res) => {
  const { eMail, password } = req.body;

  const user = await UserModel.findOne({ eMail });

  if (!user)
    return res
      .status(401)
      .send({ status: "error", error: "Usuario inexistente" });

  if (!isPwdValid(user, password))
    return res
      .status(401)
      .send({ status: "error", error: "Usuario Password Invalido" });
  // req.session.user = {
  //   name: `${user.firstName} ${user.lastName}`,
  //   eMail: user.eMail,
  // };
  const access_token = generateToken(user);
  res
    .status(200)
    .send({ status: "success", access_token, message: "LogIn Correcto" })
    .redirect("/api/products");
});

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

router.get("/register", async (req, res) => {
  res.status(200).render("register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, eMail, password } = req.body;

  let exists = await UserModel.exists({ eMail });
  if (exists)
    return res
      .status(401)
      .send({ status: "error", error: "User Registered in DataBase" });
  const user = { firstName, lastName, eMail, password: createHash(password) };
  await UserModel.create(user);
  const access_token = generateToken(user);
  res.status(200).json({
    status: "success",
    access_token,
    message: "Usuario creado correctamente",
  });

  router.post("/restaurarpass", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send(
          { status: "error", message: "El usuario no existe" }.redirect(
            "/register"
          )
        );
    }
    user.password = createHash(password);
    await user.save();

    res
      .status(200)
      .json({
        status: "success",
        message: "Contraseña actualizada correctamente",
      })
      .redirect("/login");
  });

  router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: "Logout error", message: err });
    });
    res.status(200).redirect("/login");
  });
});

export default router;