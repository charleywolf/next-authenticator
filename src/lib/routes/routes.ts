import {
  BadRequest,
  InternalServerError,
  Success,
  Unauthorized,
} from "../responses";
import { NextRequest, NextResponse } from "next/server";
import { comparePasswords, hashPassword } from "../../utils/bcrypt";
import { createAccount, getAccountFromUsername } from "../databases/crud";

import { ParsedConfig } from "../interface";
import { cookies } from "next/headers";
import { createSession } from "./session";
import { throwError } from "../../utils/misc";
import validate from "../../utils/validate";

/**
 * Handles the login request by determining if an account exists, and compares the passwords
 * If valid, it creates a session cookie and returns it to the user
 * @param {ParsedConfig} config
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function loginHandler(
  config: ParsedConfig,
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const { username, password } = (await request.json()) as {
      username: unknown;
      password: unknown;
    };

    if (
      username &&
      password &&
      typeof username === "string" &&
      typeof password === "string"
    ) {
      const accounts = await getAccountFromUsername(config, username);
      let status = false;

      for (const account of accounts) {
        if (await comparePasswords(password, account.password)) {
          status = true;
        }
      }

      if (status) {
        await createSession(config, username);
        return Success();
      } else {
        return Unauthorized();
      }
    } else {
      return BadRequest();
    }
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message === "Unexpected end of JSON input"
    ) {
      return BadRequest();
    } else {
      throwError("signupHandler", error);
      return InternalServerError();
    }
  }
}

/**
 * This functions handles the logout of a user by removing the session cookie from their end.
 * Note that this DOES NOT invalidate the cookie, as such is impossible while using encryption-based session storage rather than database-based.
 * @param {ParsedConfig} config
 * @returns {Promise<NextResponse>}
 */
export function logoutHandler(config: ParsedConfig): Promise<NextResponse> {
  try {
    cookies().delete(config.cookieName);
    return Promise.resolve(Success());
  } catch (error: unknown) {
    throwError("logoutHandler", error);
    return Promise.resolve(InternalServerError());
  }
}

/**
 * Handles the signup request, by first determining whether the username and password are valid, and then creating an account.
 * This does not create a session cookie!
 * @param {ParsedConfig} config
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function signupHandler(
  config: ParsedConfig,
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const { username, password } = (await request.json()) as {
      username: unknown;
      password: unknown;
    };

    if (
      username &&
      password &&
      typeof username === "string" &&
      typeof password === "string"
    ) {
      const validation = await validate(config, username, password);
      if (typeof validation === "string") {
        return BadRequest(validation);
      } else {
        const hashed = await hashPassword(password);
        const result = await createAccount(config, username, hashed);

        if (result) {
          return Success();
        } else {
          return InternalServerError();
        }
      }
    } else {
      return BadRequest();
    }
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message === "Unexpected end of JSON input"
    ) {
      return BadRequest();
    } else {
      throwError("signupHandler", error);
      return InternalServerError();
    }
  }
}
