import express, { NextFunction, Request, Response } from "express";
import barChart from "./data/barChart.ts";
import pieChart from "./data/pieChart.ts";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import cors from "cors";
import dotenv from "dotenv";
import { RequestContext } from "./types.ts";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const port = process.env.PORT || 8080;

const router = express.Router();

router.get("/product_data", (_, res: Response) => {
  res.send(productData);
});

router.get("/priority_data", (_, res: Response) => {
  res.send(priorityData);
});

router.get("/bar_chart", (_, res: Response) => {
  res.send(barChart);
});

router.get("/pie_chart", (_, res: Response) => {
  res.send(pieChart);
});

app.use("/", router);

// *** Start Server *** //
app.listen(port, () => {
  console.log(`Server is running on ${port} ...`);
});
