import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barchart.ts";
import pieChart from "./data/piechart.ts";
import cors from "cors";
import dotenv from "dotenv";
import DescopeClient from "@descope/node-sdk";

//
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get Authorization header and session JWT from the request
  const authHeader = req.headers?.authorization || "";
  const sessionJwt = authHeader.replace("Bearer ", "");

  try {
    // Validate the session JWT
  } catch (e) {
    return res.status(401).json({
      error: new Error("Unauthorized"),
    });
  }

  next();
};

app.use(authMiddleware);

const port = process.env.PORT || 4000;

app.get("/product_data", (_, res: Response) => {
  res.send(productData);
});

app.get("/priority_data", (_, res: Response) => {
  res.send(priorityData);
});

app.get("/bar_chart", (_, res: Response) => {
  res.send(barChart);
});

app.get("/pie_chart", (_, res: Response) => {
  res.send(pieChart);
});

// *** Start Server *** //
app.listen(port, () => {
  console.log(`Server is running on ${port} ...`);
});
