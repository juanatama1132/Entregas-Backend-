import { Router } from "express";
import { userService } from "../services/index.js";
const router = Router();
router.get("/:uId", (req, res) => {});
router.get("/current", (req, res) => {
  console.log(req.params);
});

export default router;