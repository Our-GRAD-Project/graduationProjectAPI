import express from "express";
import cors from "cors";
import v1Router from "./Src/Routes/V1.routes.js";
import ServerError from "./Utils/errorHandeling.js";

export const bootstrap = (app) => {
  app.use(cors({ credentials: true }));

  app.use(express.json());

  app.use("/api/v1", v1Router);

  app.all("*", (req, res, next) => {
    throw new ServerError("Route Not Found");
  });

  app.use((error, req, res, next) => {
    const { message, statusCode, stack } = error;
    res.status(statusCode || 500).json({
      message,
      ...(process.env.MODE === "development" && { stack }),
    });
  });
};
