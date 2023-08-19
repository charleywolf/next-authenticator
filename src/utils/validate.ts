import { getAccountFromUsername } from "../lib/databases/crud";
import {
  ParsedConfig,
  passwordCheckObject,
  usernameCheckObject,
} from "../lib/interface";
import { throwError } from "./misc";

export default async function validate(
  config: ParsedConfig,
  username: string,
  password: string,
): Promise<string | true> {
  try {
    const checks: (usernameCheckObject | passwordCheckObject)[] = [
      { function: usernameCheck, type: "username" },
      { function: passwordCheck, type: "password" },
      { function: existingAccountCheck, type: "username" },
    ];

    for (const check of checks) {
      if (check.type === "username") {
        const result = await check.function(config, username);
        if (result !== true) {
          return result;
        }
      } else if (check.type === "password") {
        const result = await check.function(config, password);
        if (result !== true) {
          return result;
        }
      }
    }

    return true;
  } catch (error: unknown) {
    throwError("validate", error);
    return "Your username or password are not formatted correctly!";
  }
}

async function existingAccountCheck(
  config: ParsedConfig,
  username: string,
): Promise<string | true> {
  const accounts = await getAccountFromUsername(config, username);
  if (accounts.length > 0) {
    return "An account with this username already exists!";
  } else {
    return true;
  }
}

function usernameCheck(config: ParsedConfig, username: string): string | true {
  const onlyNumbersLettersOneUnderscore = /^[a-zA-Z0-9]*_[a-zA-Z0-9]*$/; // only allows 1 underscore and alphanumeric
  const hasMoreThanOneUnderscore = /.*_.*_/; // allow one underscore max

  if (username === "false") {
    return "Your username is a restricted keyword!";
  } else if (hasMoreThanOneUnderscore.test(username)) {
    return "Your username may only contain one underscore!";
  } else if (!onlyNumbersLettersOneUnderscore.test(username)) {
    return "Your username may only contain alphanumeric characters!";
  } else if (username.length < 4) {
    return "Your username must be at least 4 characters";
  } else if (username.length > 24) {
    return "Your username cannot be longer than 24 characters";
  } else {
    return true;
  }
}

function passwordCheck(config: ParsedConfig, password: string): string | true {
  const noSpaces = /^[^\s]+$/; // does not allow spaces

  if (!noSpaces.test(password)) {
    return "Your password may not contain spaces!";
  } else if (!isStrongPassword) {
    return "Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character.";
  } else if (password.length < 8) {
    return "Your password must be at least 8 characters!";
  } else if (password.length > 32) {
    return "Your password may not be longer than 32 characters!";
  } else {
    return true;
  }
}

function isStrongPassword(password: string): boolean {
  const hasSpecialCharacter = /[!@#$%^&*()]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasSpecialCharacter && hasUppercase && hasLowercase && hasNumber;
}
