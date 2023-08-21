import { SessionSecret } from "../lib/interface";

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
