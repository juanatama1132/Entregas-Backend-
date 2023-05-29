import { Router } from "express";
import { userService } from "../services/index.js";
const router = Router();
router.get("/:uId", authToken, (req, res) => {});
router.get("/current", authToken, (req, res) => {
  console.log(req.params);
});

export default router;