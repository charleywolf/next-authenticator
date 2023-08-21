import { getError, throwError } from "./misc";
import crypto from "crypto";

const saltLength = 16; // Bytes

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt: string = crypto.randomBytes(saltLength).toString("hex");
    const hash: string = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return `${salt}:${hash}`;
  } catch (error) {
    throw Error(getError("hashPassword", error));
  }
}

export async function comparePasswords(
  password: string,
  storedPassword: string,
): Promise<boolean> {
  try {
    const [salt, hash] = storedPassword.split(":");
    const newHash: string = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return newHash === hash;
  } catch (error) {
    throwError("comparePasswords", error);
    return false;
  }
}
