import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barChart.ts";
import pieChart from "./data/pieChart.ts";
import cors from "cors";
import dotenv from "dotenv";
import DescopeClient from "@descope/node-sdk";
import { parseCookies, setAuthCookies } from "./authHelpers.ts";
import { RequestContext } from "./types.ts";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}

if (!process.env.DESCOPE_PROJECT_ID) {
  console.warn(
    `Please set DESCOPE_PROJECT_ID in your environment variables, falling back to author's project id.`
  );
}

const clientAuth = {
  auth: DescopeClient({
    projectId: process.env.DESCOPE_PROJECT_ID || "P2UEmfEerYrRzTavvNJI9bMTWePg",
    managementKey: process.env.DESCOPE_MANAGEMENT_KEY,
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

const port = process.env.PORT || 8082;

// *** Protected Methods *** //

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const cookies = parseCookies(req);
  // const sessionToken = cookies[DescopeClient.SessionTokenCookieName];

  const sessionToken = req.headers.authorization?.split(" ")[1] as string;

  console.log(
    "authMiddleware sessionToken",
    sessionToken?.substring(0, 10) + "..."
  );
  try {
    // validate session
    await clientAuth.auth.validateSession(sessionToken);
  } catch (e) {
    res.status(401).json({
      error: new Error("Unauthorized"),
    });
    return;
  }
  // Add sessionToken to request context for later use
  req.context = { sessionToken };
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

router.post("/update_jwt", async (req: Request, res: Response) => {
  const { sessionToken } = req.context;
  const { refreshToken } = req.body;
  console.log("sessionToken", sessionToken?.substring(0, 10) + "...");
  console.log("refreshToken", refreshToken?.substring(0, 10) + "...");
  const out = await clientAuth.auth.management.jwt.update(refreshToken, {
    AA: "BB",
    UN: "{{user.name}}",
  });
  if (!out.ok) {
    res.status(500).json(out.error);
    return;
  }
  res.json(out.data);
});

app.use("/", router);

// *** Start Server *** //
app.listen(port, () => {
  console.log(`Server is running on ${port} ...`);
});
