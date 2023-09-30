import { AuthConfig, ParsedConfig } from "./lib/interface";
import { NextRequest, NextResponse } from "next/server";
import {
  loginHandler,
  logoutHandler,
  profileHandler,
  signupHandler,
} from "./lib/routes/routes";

import { NotFound } from "./lib/responses";
import { parseConfig } from "./utils/config";

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
    profile: profileHandler,
  };

  if (methods[params.method] === undefined) {
    return NotFound();
  }

  return await methods[params.method](parsedConfig, request);
}
