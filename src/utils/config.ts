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
    mongoUri: config.mongoUri,
    mongoDatabase: config.mongoDatabase || "main",
    mongoCollection: config.mongoCollection || "accounts",
    session_private_key: config.session_private_key,
    ignoredRoutes:
      config.ignoredRoutes || /((?!_next\/static|_next\/image|favicon\.ico).*)/,
  };

  return parsed;
}
