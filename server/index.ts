import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barChart.ts";
import pieChart from "./data/pieChart.ts";
import cors from "cors";
import dotenv from "dotenv";
import { parseCookies } from "./authHelpers.ts";
import DescopeClient from "@descope/node-sdk";
import { RequestContext } from "./types.ts";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}

// Initialize DescopeClient
const clientAuth = DescopeClient({
  projectId: "P2Oyutltg1yXq6RJybwJv3ZAOnXB",
});

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const port = process.env.PORT || 8080;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = parseCookies(req);
  const sessionToken = cookies[DescopeClient.SessionTokenCookieName];

  try {
    await clientAuth.validateSession(sessionToken);
  } catch (e) {
    res.status(401).json({
      error: new Error("Unauthorized"),
    });
    return;
  }

  next();
};

const router = express.Router();
router.use(authMiddleware);

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
