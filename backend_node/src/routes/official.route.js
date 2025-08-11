import express from "express";
import { registerOfficial } from "../controllers/official.controller.js";
import { verifyInviteToken } from "../middlewares/auth/isValidInvite.js";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth/user.auth.js";

const router = express.Router();

router.post("/register/:token", verifyInviteToken, registerOfficial);
router.post("/logout", logoutUser,verifyJWT);

export default router;
