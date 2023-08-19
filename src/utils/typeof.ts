import { SessionSecret } from "../lib/interface";

export function isSessionSecret(obj: unknown): obj is SessionSecret {
  if (
    typeof obj === "object" &&
    obj !== null &&
    "username" in obj &&
    "expiration" in obj &&
    typeof obj.username !== "string" &&
    typeof obj.expiration !== "number"
  ) {
    return true;
  } else {
    return false;
  }
}
