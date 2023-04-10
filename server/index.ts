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

app.get("/oauth", async (req: Request, res: Response) => {
  const authRes = await clientAuth.auth.oauth.start.google(
    `http://localhost:${port}/oauth/finish`
  );
  if (!authRes.ok) {
    return res.status(400).send(authRes.error);
  }
  res.redirect(authRes.data!.url);
});

app.get("/oauth/finish", async (req: Request, res: Response) => {
  const { code } = req.query;
  const authRes = await clientAuth.auth.oauth.exchange(code as string);
  if (!authRes.ok) {
    return res.status(400).send(authRes.error);
  }
  setAuthCookies(res, authRes);
  res.status(302).redirect("http://localhost:3000");
});

// *** Protected Methods *** //

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = parseCookies(req);
  let sessionToken = cookies[DescopeClient.SessionTokenCookieName];
  try {
    // validate session
    await clientAuth.auth.validateSession(sessionToken);
  } catch (e) {
    // if session is invalid, try to refresh
    const refreshToken = cookies[DescopeClient.RefreshTokenCookieName];
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

router.post("/logout", async (req: Request, res: Response) => {
  const { sessionToken } = req.context;
  await clientAuth.auth.logout(sessionToken);

  res.clearCookie(DescopeClient.SessionTokenCookieName);
  res.clearCookie(DescopeClient.RefreshTokenCookieName);

  res.sendStatus(200);
});

app.use("/", router);

// *** Start Server *** //
app.listen(port, () => {
  console.log(`Server is running on ${port} ...`);
});
