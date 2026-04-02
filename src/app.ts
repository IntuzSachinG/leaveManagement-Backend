import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { globalErrorHandler } from "./middlewares/errorMiddleware";
import { notFoundHandler } from "./middlewares/notfoundMiddleware";
// import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// app.use(errorMiddleware);
app.use(globalErrorHandler)
app.use(notFoundHandler);
export default app;
