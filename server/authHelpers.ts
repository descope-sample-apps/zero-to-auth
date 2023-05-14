import { Request } from "express";

export const getToken = (req: Request) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  }
  return "";
};
