import express from "express";
import productData from "./data/productData.json" assert { type: "json" };
import priorityData from "./data/priorityData.json" assert { type: "json" };
import barchart from "./data/barchart.json" assert { type: "json" };
import piechart from "./data/piechart.json" assert { type: "json" };
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/product_data", (req, res) => {
  res.send(productData);
});

app.get("/priority_data", (req, res) => {
  res.send(priorityData);
});

app.get("/bar_chart", (req, res) => {
  res.send(barchart);
});

app.get("/pi_chart", (req, res) => {
  res.send(piechart);
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
