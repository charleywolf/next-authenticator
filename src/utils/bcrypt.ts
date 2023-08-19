import bcrypt from "bcrypt";
import { getError, throwError } from "./misc";
const saltRounds: number = 10;

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error: unknown) {
    throw Error(getError("hashPassword", error));
  }
}

export async function comparePasswords(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error: unknown) {
    throwError("comparePasswords", error);
    return false;
  }
}
