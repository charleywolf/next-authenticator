import { NextRequest, NextResponse } from "next/server";
import { AuthConfig, ParsedConfig } from "./lib/interface";
import { parseConfig } from "./utils/config";
import { getSession } from "./lib/routes/session";
import {
  loginHandler,
  logoutHandler,
  signupHandler,
} from "./lib/routes/routes";

/**
 * Next.js app router middleware function
 * Checks if you are attempting to access a protected route or attempting to access the callback route while logged in with callbackRedirect enabled
 * Provides the authorization header for your API routes
 * For implementation, view the GitHub documentation
 * @param {AuthConfig} config - The configuration of the authenticator
 * @param {NextRequest} request - The request to be checked
 * @returns {NextResponse|void} - The NextResponse to be returned
 */
export async function authenticatorMiddleware(
  config: AuthConfig,
  request: NextRequest,
) {
  const parsedConfig: ParsedConfig = parseConfig(config);

  if (parsedConfig.ignoredRoutes.test(request.nextUrl.pathname)) {
    const session: string | false = await getSession(parsedConfig, request);

    if (
      !session &&
      parsedConfig.protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route),
      )
    ) {
      return NextResponse.rewrite(
        new URL(parsedConfig.callbackRoute, request.url),
      );
    } else if (
      session &&
      request.nextUrl.pathname.startsWith(parsedConfig.callbackRoute) &&
      parsedConfig.callbackRedirect !== false
    ) {
      return NextResponse.rewrite(
        new URL(parsedConfig.callbackRedirect, request.url),
      );
    } else {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(parsedConfig.headerName, session || "false");

      return NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });
    }
  }
}

/**
 * Next.js app router route handlers for login, signup, and logout
 * All of the params, excluding the config, are given to you by Next.js
 * For implementation, view the GitHub documentation
 * @param {AuthConfig} config - The configuration of the authenticator
 * @param {NextRequest} request - The request to be checked
 * @returns {NextResponse|void} - The NextResponse to be returned
 * @param {Object} params - The parameters object
 * @param {"login" | "logout" | "signup"} params.method - The nested value of the method
 */
export async function authenticatorRoutes(
  config: AuthConfig,
  request: NextRequest,
  { params }: { params: { method: "login" | "logout" | "signup" } },
): Promise<NextResponse> {
  const parsedConfig: ParsedConfig = parseConfig(config);

  const methods = {
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
  };

  return await methods[params.method](parsedConfig, request);
}
