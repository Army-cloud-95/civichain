import express from "express";
import { verifyJWT } from "../middlewares/auth/user.auth.js";
import { logoutUser } from "../controllers/user.controller.js";
import { registerUser } from "../controllers/citizen.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createIssue, getAllIssues, getSortedIssues } from "../controllers/issue.controller.js";
import { postvote } from "../controllers/vote.controller.js";
import { requireCitizen, requireRoles } from "../middlewares/auth/reqRoles.js";

const router = express.Router();
const POST_FIELD= { name: "issueImg", maxCount:1};


router.post("/register",(registerUser));
router.post("/logout",(logoutUser),verifyJWT);
router.post("/createIssue",verifyJWT,requireCitizen, upload.fields([POST_FIELD]),createIssue);
router.get("/getIssues",verifyJWT,requireCitizen,getAllIssues);
router.get("/sortIssues",verifyJWT,requireCitizen,getSortedIssues);
router.post("/getIssues/:issueId/vote",verifyJWT,requireCitizen,postvote);
router.post("/sortIssues/:issueId/vote",verifyJWT,requireCitizen,postvote);

export default router;
