const express = require("express");
const dotenv = require("dotenv").config();
const productData = require("./data/productData.json");
const priorityData = require("./data/priorityData.json");
const barchart = require("./data/barchart.json");
const piechart = require("./data/piechart.json");

var cors = require("cors");

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
