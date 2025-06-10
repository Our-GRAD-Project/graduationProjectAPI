import { Router } from "express";
import authRouter from "../Modules/Auth/Routes/auth.routes.js";
import summaryRouter from "../Modules/Summary/Routes/summary.Route.js" 
import categoryRouter from "../Modules/Summary/Routes/category.routes.js" 

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/summary", summaryRouter);
v1Router.use("/categories", categoryRouter);
v1Router.use((req, res) => {
  res.json({ message: "route is working" });
});

export default v1Router;
