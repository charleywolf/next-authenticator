import { getError, throwError } from "./misc";
import bcrypt from "bcrypt";

const saltLength: number = 16; // Bytes

/**
 * Hashes passwords using the `bcrypt` module
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, saltLength);
  } catch (error) {
    throw Error(getError("hashPassword", error));
  }
}

/**
 * Compares a hashed password with an unhashed password using the `bcrypt` module
 */
export async function comparePasswords(
  password: string,
  storedHash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, storedHash);
  } catch (error) {
    throwError("comparePasswords", error);
    return false;
  }
}
