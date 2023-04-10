import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barChart.ts";
import pieChart from "./data/pieChart.ts";
import cors from "cors";
import dotenv from "dotenv";
import DescopeClient from "@descope/node-sdk";
import { setAuthCookies } from "./authHelpers.ts";

dotenv.config();

if (!process.env.DESCOPE_PROJECT_ID) {
  console.warn(
    `Please set DESCOPE_PROJECT_ID in your environment variables, falling back to author's project id.`
  );
}

const clientAuth = {
  auth: DescopeClient({
    projectId: process.env.DESCOPE_PROJECT_ID || "P2O9zUpunOAGLdVHie8He79diqHU",
  }),
};

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const port = process.env.PORT || 8080;

// *** Login Methods *** //

app.post("/otp/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  const authRes = await clientAuth.auth.otp.signUpOrIn.email(email);
  if (!authRes.ok) {
    return res.status(400).send(authRes.error);
  }
  res.sendStatus(200);
});

// ## Add this route to verify the OTP code sent to the user's email
app.post("/otp/verify", async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const authRes = await clientAuth.auth.otp.verify.email(email, code);
  if (!authRes.ok) {
    return res.status(400).send(authRes.error);
  }
  // ## Set the cookies on the response
  setAuthCookies(res, authRes);
  res.sendStatus(200);
});

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
