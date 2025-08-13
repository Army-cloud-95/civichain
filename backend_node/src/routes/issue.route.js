// import express from "express";
// import { upload } from "../middlewares/multer.middleware.js";
// import { createIssue, getAllIssues, getSortedIssues } from "../controllers/issue.controller.js";
// import { postvote } from "../controllers/vote.controller.js";
// import { requireCitizen, requireRoles } from "../middlewares/auth/reqRoles.js";

// const router = express.Router();
// const POST_FIELD= { name: "issueImg", maxCount:1};

// router.post("/createIssue", requireCitizen, upload.fields([POST_FIELD]),createIssue);
// router.get("/getIssues",requireRoles("Official", "Citizen"),getAllIssues);
// router.get("/sortIssues",requireRoles("Official", "Citizen"),getSortedIssues);
// router.post("getIssues/:issueId/vote",requireCitizen,postvote);
// router.post("/sortIssues/:issueId/vote",requireCitizen,postvote);

// export default router;
