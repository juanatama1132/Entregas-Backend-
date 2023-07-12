import jwt from "jsonwebtoken";
import { CfgObject } from "../config/config.js";

const PRIVATE_KEY = CfgObject.jwt_Private_Key;
const generateToken = (user, expire = "24h") => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: expire });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ status: "error", error: "not Autenticated" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credential) => {
    if (error instanceof jwt.TokenExpiredError)
      res
        .status(401)
        .json({ status: "error", error: "Token has expired" })
        .redirect("/logout");

    if (error instanceof jwt.JsonWebTokenError)
      res
        .status(401)
        .json({ status: "error", error: "Token corrompido" })
        .redirect("/logout");

    if (error) {
      res.status(403).json({ status: "error", error: "not Autenticated" });
    }

    req.user = credential.user;
    next();
  });
};

export { generateToken, authToken, PRIVATE_KEY };
