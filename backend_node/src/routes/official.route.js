import express from "express";
import { getOffIssues, registerOfficial } from "../controllers/official.controller.js";
import { verifyInviteToken } from "../middlewares/auth/isValidInvite.js";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth/user.auth.js";
import { updateIssueProgress } from "../controllers/issue.controller.js";
import { requireOfficial } from "../middlewares/auth/reqRoles.js";


const router = express.Router();

router.post("/register/:token", verifyInviteToken, registerOfficial);
router.post("/logout", verifyJWT,logoutUser);
router.get("/issues/:issueId",verifyJWT,requireOfficial,getOffIssues);
router.put("/issues/:issueId/progress",verifyJWT,requireOfficial,updateIssueProgress);

export default router;
