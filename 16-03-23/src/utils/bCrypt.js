import bcrypt from "bcrypt";
const createHash = (Password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(15));
const isPwdValid = (user, password) =>
  bcrypt.compareSync(password, user.password);
module.exports = { createHash, isPwdValid };