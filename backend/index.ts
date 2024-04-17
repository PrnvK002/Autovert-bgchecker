import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.config";
import { errorHandler, notFound } from "./middlewares/errorHandler.middleware";

//For env File
dotenv.config();

//route imports
import authRoutes from "./routes/auth.router";
import templateRoutes from "./routes/template.router";
import fieldRoutes from "./routes/field.router";
import userRoutes from "./routes/user.router";
import versionRoutes from "./routes/version.router";
import uploadRoutes from "./routes/upload.router";



//for connecting db
connectDB();

const app: Application = express();
const port = process.env.PORT || 8000;

//setting cors like open to all domains
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));

//setting up route modules
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/template", templateRoutes);
app.use("/api/v1/field", fieldRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/version", versionRoutes);
app.use("/api/v1/upload", uploadRoutes);

//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
