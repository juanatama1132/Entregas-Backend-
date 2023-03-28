import jwt from "jsonwebtoken";
const PRIVATE_KEY = "";
const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ status: "error", error: "not Autenticated" });
  }
  const token = authHeader.slipt(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, Credential) => {
    if (error) {
      return res
        .status(403)
        .json({ status: "error", error: "not Autenticated" });
    }
    req.user = Credential.user;
    next();
  });
};

module.exports = {
  generateToken,
  authToken,
};