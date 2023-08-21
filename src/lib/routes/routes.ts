import { NextRequest, NextResponse } from "next/server";
import { ParsedConfig } from "../interface";
import {
  InternalServerError,
  Success,
  BadRequest,
  Unauthorized,
} from "../responses";
import { cookies } from "next/headers";
import { throwError } from "../../utils/misc";
import { createAccount, getAccountFromUsername } from "../databases/crud";
import { comparePasswords, hashPassword } from "../../utils/bcrypt";
import { createSession } from "./session";
import validate from "../../utils/validate";

export async function loginHandler(
  config: ParsedConfig,
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const { username, password } = await request.json();

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

export async function logoutHandler(
  config: ParsedConfig,
): Promise<NextResponse> {
  try {
    cookies().delete(config.cookieName);
    return Success();
  } catch (error: unknown) {
    throwError("logoutHandler", error);
    return InternalServerError();
  }
}

export async function signupHandler(
  config: ParsedConfig,
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const { username, password } = await request.json();

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
