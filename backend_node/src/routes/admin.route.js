import express from "express";
import { getPendingOfficial, getAllOfficial } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth/user.auth.js";
import { requireAdmin } from "../middlewares/auth/reqRoles.js";
import { createInvite } from "../controllers/invite.controller.js";
import { logoutUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/pendingOfficials",verifyJWT, requireAdmin, getPendingOfficial);
router.get("/allOfficials",verifyJWT,requireAdmin,getAllOfficial);
router.post("/createInvite", verifyJWT, requireAdmin, createInvite);
// router.get("/register", registerAdmin);
router.get("/logout",logoutUser,verifyJWT);

export default router;
