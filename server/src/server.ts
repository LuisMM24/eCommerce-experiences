import express from "express";
const { SESSION_SECRET } = require("./config/config");
const helmet = require("helmet");
const cors = require("cors");
const { json } = require("body-parser");
// middlewares
const errorMiddleware = require("./middleware/error-middleware");
// routes
const experienceRouter = require("./routes/experienceRoute");
const userRouter = require("./routes/userRoute");
// cookies securely
const session = require("express-session");

const app = express();
// cookie-session settings
// const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     name: "sessionId",
//     cookie: {
//       secure: true,
//       httpOnly: true,
//       domain: "example.com",
//       path: "foo/bar",
//       expires: expiryDate,
//     },
//   })
// );

app.use(cors());
app.use(helmet());
app.use(json());

// routes
app.use("/experiences", experienceRouter);
app.use("/users", userRouter);
app.use(errorMiddleware);

module.exports = app;
