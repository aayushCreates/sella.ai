import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./utils/error.utils";

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/auth/");

app.use(errorHandler);

app.get("/health", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}🚀🚀🚀`);
});
