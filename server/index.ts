import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts" 
import priorityData from "./data/priorityData.ts"
import barchart from "./data/barchart.ts";
import piechart from "./data/piechart.ts";
import cors from "cors";
import dotenv from 'dotenv';
import DescopeClient from '@descope/node-sdk';
import { parseCookies, returnCookies as setCookies } from "./authHelpers.ts";

dotenv.config();

if (!process.env.DESCOPE_PROJECT_ID) {
  console.warn(`Please set DESCOPE_PROJECT_ID in your environment variables, falling back to author's project id.`)
}
const clientAuth = {
  auth: DescopeClient({
    projectId: process.env.DESCOPE_PROJECT_ID || 'P2O9zUpunOAGLdVHie8He79diqHU',
  }),
};

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

// *** Login Methods *** //

app.post("/otp/login", async (req: Request, res: Response) => {
  const { body } = req;
  const { email } = body;
  const out = await clientAuth.auth.otp.signUpOrIn.email(email);
  if (!out.ok) {
    return res.status(400).send(out.error);
  }
  res.sendStatus(200);
});

app.post("/otp/verify", async (req: Request, res: Response) => {
  const { body } = req;
  const { email, code } = body;
  const out = await clientAuth.auth.otp.verify.email(email, code);
  setCookies(res, out);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(out.data);
});

app.post('/oauth', async (req: Request, res: Response) => {
  const out = await clientAuth.auth.oauth.start.google(
    `http://localhost:${port}/oauth/finish`,
  );
  if (!out.ok) {
    return res.status(400).send(out.error);
  }
  res.send(out.data!.url);
});

app.get('/oauth/finish', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const out = await clientAuth.auth.oauth.exchange(code);
  setCookies(res, out);
  res.status(302).redirect("http://localhost:3000/admin");
});

// *** Protected Methods *** //

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = parseCookies(req);
    const out = await clientAuth.auth.validateAndRefreshSession(
      cookies[DescopeClient.SessionTokenCookieName],
      cookies[DescopeClient.RefreshTokenCookieName],
    );
    if (out?.cookies) {
      res.set('Set-Cookie', out.cookies);
    }
    next();
  } catch (e) {
    res.status(401).json({
      error: new Error('Unauthorized!'),
    });
  }
};

// Add authMiddleware to all routes bellow
const router = express.Router()
router.use(authMiddleware)

router.get("/product_data", authMiddleware, (req: Request, res: Response) => {
  res.send(productData);
});

router.get("/priority_data", authMiddleware, (req: Request, res: Response) => {
  res.send(priorityData);
});

router.get("/bar_chart", authMiddleware, (req: Request, res: Response) => {
  res.send(barchart);
});

router.get("/pi_chart", authMiddleware, (req: Request, res: Response) => {
  res.send(piechart);
});

app.use("/", router);

// *** Start Server *** //
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
