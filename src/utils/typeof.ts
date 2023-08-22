import { SessionSecret } from "../lib/interface";

/**
 * Determines whether a provided object is the same type as the SessionSecret interface
 * @param {unknown} obj
 * @returns {obj is SessionSecret}
 */
export function isSessionSecret(obj: unknown): obj is SessionSecret {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "username" in obj &&
    "expiration" in obj &&
    typeof obj.username !== "string" &&
    typeof obj.expiration !== "number"
  );
}
