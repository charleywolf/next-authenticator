import { AuthConfig, ParsedConfig } from "../lib/interface";

export function parseConfig(config: AuthConfig): ParsedConfig {
  const defaultExpiration = 7 * 24 * 60 * 60 * 1000;
  const parsed: ParsedConfig = {
    protectedRoutes: config.protectedRoutes || [],
    callbackRoute: config.callbackRoute || "/login",
    callbackRedirect: config.callbackRedirect || false,
    headerName: config.headerName || "next_authenticator",
    cookieName: config.cookieName || "NEXT_AUTHENTICATOR_COOKIE",
    secure: config.secure || true,
    cookieExpiration: config.cookieExpiration || defaultExpiration,
    mongo_uri: config.mongo_uri,
    session_private_key: config.session_private_key,
  };

  return parsed;
}
