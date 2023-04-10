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

app.post("/otp/verify", async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const authRes = await clientAuth.auth.otp.verify.email(email, code);
  if (!authRes.ok) {
    return res.status(400).send(authRes.error);
  }
  setAuthCookies(res, authRes);
  res.sendStatus(200);
});

// *** Protected Methods *** //
// ## Auth middleware that validates session and refreshes if needed
// ## Adds sessionToken to request context for later use
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = parseCookies(req);
  const refreshToken = cookies[DescopeClient.RefreshTokenCookieName];
  let sessionToken = cookies[DescopeClient.SessionTokenCookieName];
  try {
    // validate session
    await clientAuth.auth.validateSession(sessionToken);
  } catch (e) {
    // if session is invalid, try to refresh
    const authRes = await clientAuth.auth.refresh(refreshToken);
    if (!authRes.ok) {
      res.status(401).json({
        error: new Error("Unauthorized"),
      });
      return;
    }
    setAuthCookies(res, authRes);
    sessionToken = authRes.data!.sessionJwt;
  }
  // Add sessionToken to request context for later use
  req.context = { sessionToken, refreshToken };
  next();
};

const authRouter = express.Router();
authRouter.use(authMiddleware);

authRouter.get("/product_data", (_, res: Response) => {
  res.send(productData);
});

authRouter.get("/priority_data", (_, res: Response) => {
  res.send(priorityData);
});

authRouter.get("/bar_chart", (_, res: Response) => {
  res.send(barChart);
});

authRouter.get("/pie_chart", (_, res: Response) => {
  res.send(pieChart);
});

app.use("/", authRouter);

// *** Start Server *** //
app.listen(port, () => {
  console.log(`Server is running on ${port} ...`);
});
