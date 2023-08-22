// skipcq: JS-C1003
import * as Iron from "iron-webcrypto";

import { ParsedConfig, SessionSecret } from "../interface";

import { NextRequest } from "next/server";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import getCrypto from "../../utils/crypto";
import { isSessionSecret } from "../../utils/typeof";
import { throwError } from "../../utils/misc";

/**
 * @type {Crypto}
 */
const _crypto: Crypto = getCrypto();

/**
 * Gets the current session if it exists and is valid/unexpired
 * @param {ParsedConfig} config
 * @param {NextRequest} request
 * @returns {Promise<undefined | string>} Returns undefined if no valid session exists, or the username of the current session if one does.
 */
export async function getSession(
  config: ParsedConfig,
  request: NextRequest,
): Promise<undefined | string> {
  const cookie = request.cookies.get(config.cookieName);
  if (!cookie || !cookie.value) return undefined;
  try {
    const secret = await Iron.unseal(
      _crypto,
      cookie.value,
      config.session_private_key,
      Iron.defaults,
    );

    if (isSessionSecret(secret) && secret.expiration > Date.now()) {
      return secret.username;
    } else {
      return undefined;
    }
  } catch (error) {
    throwError("getSession", error);
    return undefined;
  }
}

/**
 * Creates a session for a username
 * @param {ParsedConfig} config To get the expiration time
 * @param {string} username To set the username of the new session
 * @returns {Promise<false | ResponseCookies>} Returns false if an error occured, or the new cookies if it was successfully created/cookies set
 */
export async function createSession(
  config: ParsedConfig,
  username: string,
): Promise<false | ResponseCookies> {
  try {
    const secret: SessionSecret = {
      expiration: config.cookieExpiration,
      username,
    };

    const sealedSecret = await Iron.seal(
      _crypto,
      secret,
      config.session_private_key,
      Iron.defaults,
    );

    return cookies().set({
      name: config.cookieName,
      value: sealedSecret,
      expires: config.cookieExpiration,
      secure: config.secure,
      path: "/",
    });
  } catch (error) {
    throwError("createSession", error);
    return false;
  }
}
