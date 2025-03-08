import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    crodentials: true
}))

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true,limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())



//routes
import userRouter from "./routes/user.routes.js"
import businessRouter from "./routes/business.routes.js"
import reviewRouter from "./routes/reviews.route.js"

// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/business", businessRouter)
app.use("/api/v1/review", reviewRouter)
export { app }