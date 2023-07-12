import { userService } from "../services/index.js";
import { generateToken } from "../utils/jsonwt.js";
import { isValidPassword, createHash } from "../utils/bCrypt.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
import { sendMail } from "../utils/sendMail.js";
import { userDTO } from "../dto/user.dto.js";
export class AuthClass {
  navLogIn = async (req, res) => {
    res.status(200).render("login");
  };

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

    // const { password: pass, ...rest } = user;
    const tokenUser = userDTO.tokenUser(user);
    const token = generateToken(tokenUser);

    res
      .cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000 })
      .status(200)
      .redirect("/api/products");
  };

  navRegister = async (req, res) => {
    res.status(200).render("register");
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

  navSendRecoveryMail = async (req, res) => {
    res.status(200).render("sendrecoverymail");
  };

  sendRecoveryMail = async (req, res) => {
    const { eMail } = req.body;
    const { password: pass, ...rest } = user;
    const token = generateToken(rest, "1h");
    //envio Mail con Link
    const cfgMail = {
      userMail: eMail,
      subject: "Solicitud Recuperacion Password",
      html: `<div>
<h2>Acceso a Recuperar Passwurd</h2>
<a href="http://localhost:${CfgObject.PORT}/restaurarpass?tk=${token}"><button>Recuperar Password</button></a>
</div>`,
    };
    sendMail(cfgMail);
  };

  navRecoverPass = async (req, res) => {
    const { tk } = req.params;
    res
      .cookie("coderCookieToken", tk, { maxAge: 60 * 60 * 1000 })
      .status(200)
      .render("recoverpass");
  };

  RecoverPass = async (req, res) => {
    const eMail = req.user.eMail;
    const { password, nwpassword } = req.body;
    const user = await userService.getUser(eMail);
    if (password !== nwpassword) {
      return res
        .status(401)
        .send(
          { status: "error", error: "El Password debe ser Diferente" }.render(
            "recoverpass"
          )
        );
    }

    if (!isValidPassword(user, password)) {
      user.password = createHash(password);
      await user.save();
    } else {
      return res
        .status(401)
        .send(
          { status: "error", error: "El Password debe ser Diferente" }.render(
            "recoverpass"
          )
        );
    }
    //Validar PassWord
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