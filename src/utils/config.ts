import { AuthConfig, ParsedConfig } from "../lib/interface";

/**
 * Parses the config by putting in defaults where nothing was provided
 * @param {AuthConfig} config
 * @returns {ParsedConfig}
 */
export function parseConfig(config: AuthConfig): ParsedConfig {
  const defaultExpiration = 7 * 24 * 60 * 60 * 1000;
  if (config.session_private_key.length < 32) {
    throw Error("Your session_private_key must be at least 32 characters!");
  }

  const parsed: ParsedConfig = {
    protectedRoutes: config.protectedRoutes ?? [],
    callbackRoute: config.callbackRoute ?? "/login",
    callbackRedirect: config.callbackRedirect ?? false,
    headerName: config.headerName ?? "next_authenticator",
    cookieName: config.cookieName ?? "NEXT_AUTHENTICATOR_COOKIE",
    secure: config.secure ?? true,
    cookieExpiration: config.cookieExpiration ?? defaultExpiration,
    mongoUri: config.mongoUri,
    mongoDatabase: config.mongoDatabase ?? "main",
    mongoCollection: config.mongoCollection ?? "accounts",
    session_private_key: config.session_private_key,
    ignoredRoutes:
      config.ignoredRoutes ?? /((?!_next\/static|_next\/image|favicon\.ico).*)/,
  };

  return parsed;
}
