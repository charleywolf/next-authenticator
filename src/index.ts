import { NextRequest, NextResponse } from "next/server";
import { AuthConfig, ParsedConfig } from "./lib/interface";
import { parseConfig } from "./utils/config";
import { getSession } from "./lib/session";

/**
 * Next.js app router middleware function to check if you are attempting to access a protected route or attempting to access the callback route while logged in with callbackRedirect enabled
 * @param {AuthConfig} config - The configuration of the authenticator.
 * @param {NextRequest} request - The request to be checked.
 * @returns {NextResponse|void} - The NextResponse to be returned.
 */
export async function authenticatorMiddleware(
  config: AuthConfig,
  request: NextRequest,
) {
  const parsedConfig: ParsedConfig = parseConfig(config);
  const session: string | false = await getSession(parsedConfig, request);

  if (parsedConfig.ignoredRoutes.test(request.nextUrl.pathname)) {
    if (
      parsedConfig.protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route),
      )
    ) {
      return NextResponse.rewrite(
        new URL(parsedConfig.callbackRoute, request.url),
      );
    } else if (
      request.nextUrl.pathname.startsWith(parsedConfig.callbackRoute) &&
      parsedConfig.callbackRedirect !== false &&
      session
    ) {
      return NextResponse.rewrite(
        new URL(parsedConfig.callbackRedirect, request.url),
      );
    }
  }
}
