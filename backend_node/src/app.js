import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//Routes
import userRouter from "./routes/user.route.js";
// import issueRouter from "./routes/issue.route.js";
import officialRouter from "./routes/official.route.js";
import adminRouter from "./routes/admin.route.js";
import { loginUser } from "./controllers/user.controller.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/citizen", userRouter);
app.use("/official",officialRouter);
app.use("/admin",adminRouter);
app.post("/login",loginUser);

export { app };
