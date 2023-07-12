import { userService } from "../services/index.js";
export class UserClass {
  getUsers = async (req, res) => {
    try {
      const users = userService.getUsers;
      return res.status(200).send({ status: "OK", payload: users });
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "No se encontraron Usuarios" });
    }
  };

  getUser = async (req, res) => {
    const { eMail } = req.user.eMail;
    try {
      const user = userService.getUser(eMail);
      return res.status(200).send({ status: "OK", payload: user });
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "Usuario no encontrado" });
    }
  };

  getCurUser = async (req, res) => {
    const { eMail } = req.user.eMail;
    try {
      const user = userService.getUser(eMail);
      return res.status(200).send({ status: "OK", payload: user });
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "Usuario no encontrado" });
    }
  };
  getUserById = async (req, res) => {
    const { uId } = req.params;
    try {
      const user = userService.getUserById(uId);
      return res.status(200).send({ status: "OK", payload: user });
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "Usuario no encontrado" });
    }
  };

  updateUser = async (req, res) => {
    try {
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "No se Pudo Modificar el Usuario" });
    }
  };
  deleteUser = async (req, res) => {
    const { uId } = req.params;
    try {
      userService.deleteUser(uId);
      return res;
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "No se Pudo Eliminar el Usuario" });
    }
  };
}