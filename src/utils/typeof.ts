import { SessionSecret } from "../lib/interface";

export function isSessionSecret(obj: unknown): obj is SessionSecret {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const { username, expiration } = obj as SessionSecret;

  if (typeof username !== "string" || typeof expiration !== "number") {
    return false;
  }

  return true;
}
