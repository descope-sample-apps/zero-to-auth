import DescopeClient, { SdkResponse, ResponseData } from "@descope/node-sdk";
import { Response } from "express";

/**
 * Generate a cookie string from given parameters
 * @param name name of the cookie
 * @param value value of cookie that must be already encoded
 * @param options any options to put on the cookie like cookieDomain, cookieMaxAge, cookiePath
 * @returns Cookie string with all options on the string
 */
const generateCookie = (
  name: string,
  value: string,
  options?: Record<string, string | number>
) =>
  `${name}=${value}; Max-Age=${options?.cookieMaxAge || ""}; Path=${
    options?.cookiePath || "/"
  }; HttpOnly; SameSite=Strict`;

export const setAuthCookies = <T extends ResponseData>(
  res: Response,
  out: SdkResponse<T>
) => {
  // Set cookies with
  // - Response's cookies
  // - Response's session-token (if it exists)
  // Note: Session token may grow, especially in cases of using authorization, or adding custom claims,
  // This may cause it size to pass browser cookies size limit, use carefully.
  const { cookies = [], sessionJwt = "", ...rest } = out?.data! || {};
  const setCookies = [...cookies];
  if (sessionJwt) {
    setCookies.push(
      generateCookie(DescopeClient.SessionTokenCookieName, sessionJwt, rest)
    );
  }
  res.set("Set-Cookie", setCookies);
};
