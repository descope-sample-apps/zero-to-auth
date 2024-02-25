import express, { Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barChart1.ts";
import pieChart from "./data/pieChart.ts";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

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
