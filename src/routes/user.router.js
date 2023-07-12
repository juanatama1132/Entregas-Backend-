import { Router } from "express";
import { UserClass } from "../controlers/user.controler.js";
import { authToken } from "../utils/jsonwt.js";
const userClass = new UserClass();
const router = Router();

router.get("/:uId", authToken, userClass.getUserById);
router
  .get("/current", authToken, userClass.getCurUser)
  .get("/premium/:uId", authToken, userClass.getUserById)
  .get("/:uid/documents", authToken, userClass.getUserById)
  .post("/:uid/documents", authToken, userClass.updateUser)
  .delete("/:uId", authToken, userClass.deleteUser);
export default router;