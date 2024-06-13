import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import { connectDB } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/user", userRouter);

app.use(errorHandler);

connectDB()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));
