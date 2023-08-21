import { getError, throwError } from "./misc";
import bcrypt from "bcrypt";

const saltLength: number = 16; // Bytes

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, saltLength);
  } catch (error) {
    throw Error(getError("hashPassword", error));
  }
}

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
