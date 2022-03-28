import express from "express";
const helmet = require("helmet");
const cors = require("cors");
const { json } = require("body-parser");
// middlewares
const errorMiddleware = require("./middleware/error-middleware");
// routes
const experienceRouter = require("./routes/experienceRoute");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(helmet());
app.use(json());

// routes
// app.use("/experiences", experienceRouter);
app.use("/users", userRouter);
app.use(errorMiddleware);

module.exports = app;
