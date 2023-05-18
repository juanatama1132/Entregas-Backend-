import { userService } from "../services/index.js";
import { generateToken } from "../utils/jsonwt.js";
import { isValidPassword, createHash } from "../utils/bCrypt.js";

export class AuthClass {
  LogIn = async (req, res) => {
    const { eMail, password } = req.body;
    const user = await userService.getUser(eMail);
    if (!user)
      return res
        .status(401)
        .send({ status: "error", error: "Usuario inexistente" });

    if (!isValidPassword(user, password))
      return res
        .status(401)
        .send({ status: "error", error: "Usuario Password Invalido" });

    const { password: pass, ...rest } = user;
    const token = generateToken(rest);
    res
      .cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000 })
      .status(200)
      //.send({ status: "success", access_token, message: "LogIn Correcto" });
      .redirect("/api/products");
  };

  Register = async (req, res) => {
    const { firstName, lastName, eMail, age, password } = req.body;

    let exists = await userService.exists(eMail);
    if (exists)
      return res
        .status(401)
        .send({ status: "error", error: "User Registered in DataBase" });
    const user = {
      firstName,
      lastName,
      eMail,
      age,
      password: createHash(password),
    };
    await userService.createUser(user);

    const access_token = generateToken(user);
    res.status(200).json({
      status: "success",
      access_token,
      message: "Usuario creado correctamente",
    });
  };

  RestorePwd = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.userExists(email);

    if (user == false) {
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
  };
  TestLog = async (req, res) => {
    req.logger.fatal("Fatal Error Message");
    req.logger.error("Error Message");
    req.logger.warning("Warning Message");
    req.logger.info("Info Message");
    req.logger.http("Http Message");
    req.logger.degug("Debug Message");
    res.send({ message: "Testeando Logger!!" });
  };
  LogOut = async (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: "Logout error", message: err });
    });
    res.status(200).redirect("/login");
  };
}