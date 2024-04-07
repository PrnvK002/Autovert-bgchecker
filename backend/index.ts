import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.config";
import { errorHandler, notFound } from "./middlewares/errorHandler.middleware";


//route imports
import authRoutes from "./routes/auth.router";

//For env File
dotenv.config();

//for connecting db
connectDB()

const app: Application = express();
const port = process.env.PORT || 8000;

//setting cors like open to all domains
app.use(cors());

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));

//setting up route modules
app.use("/auth", authRoutes);

//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
