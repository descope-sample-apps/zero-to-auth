import express, { NextFunction, Request, Response } from "express";
import productData from "./data/productData.ts";
import priorityData from "./data/priorityData.ts";
import barChart from "./data/barchart.ts";
import pieChart from "./data/pieChart.ts";
import cors from "cors";
import dotenv from "dotenv";
import DescopeClient from "@descope/node-sdk";
import { getSessionToken } from "./authHelpers.ts";
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
    projectId: process.env.DESCOPE_PROJECT_ID || "P2My9KRakUMj40L8KOBjAJLVWhWC",
    managementKey:
      "K2acseBkYJ7v6VlFtG7AKLb9LSpLwdlntVNQaA5PLYkjwue1pbsRCMwe3cBj6y3VBVl8CsL",
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
  const sessionToken = getSessionToken(req);
  try {
    // validate session
    await clientAuth.auth.validateSession(sessionToken);
  } catch (e) {
    console.log("@@@ oops", e);
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

router.post("/authorize_user", async (req: Request, res: Response) => {
  const { email } = req.query as { email: string };
  console.log("@@@ email", email);
  await clientAuth.auth.management.user.updateCustomAttribute(
    email,
    "publicUserId",
    "abcd1234"
  );
  await clientAuth.auth.management.user.updateCustomAttribute(
    email,
    "publicTenantId",
    "xyz9876"
  );

  // return 200
  res.status(200).send();
});
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
