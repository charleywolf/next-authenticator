import * as Iron from "iron-webcrypto";
import getCrypto from "../../utils/crypto";
import { cookies } from "next/headers";

import { ParsedConfig, SessionSecret } from "../interface";
import { throwError } from "../../utils/misc";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/server";
import { isSessionSecret } from "../../utils/typeof";

const _crypto: Crypto = getCrypto();

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

export async function createSession(
  config: ParsedConfig,
  username: string,
): Promise<false | ResponseCookies> {
  try {
    const secret: SessionSecret = {
      expiration: config.cookieExpiration,
      username: username,
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
