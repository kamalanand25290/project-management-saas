import Router from "express";
import { authenticate } from "./auth.middleware";
import { register, login, getMe } from "./auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);

export default router;