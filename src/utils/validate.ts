import { getAccountFromUsername } from "../lib/databases/crud";
import {
  ParsedConfig,
  passwordCheckObject,
  usernameCheckObject,
} from "../lib/interface";
import { throwError } from "./misc";

/**
 * Checks for validation issues by running an array of provided validation checks for the username & password
 * Used in the account creation/signup process to ensure there are no issues
 * @param config
 * @param username
 * @param password
 * @returns {Promise<string | true>} Returns an error message for the bad request response, or true if no validation errors were found.
 */
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

/**
 * Checks if there is an existing account with the same username provided.
 * @param {ParsedConfig} config
 * @param {string} username
 * @returns {Promise<string | true>} Returns an error message or true if no error was found.
 */
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

/**
 * Checks through the username for a few issues:
 * - Username is a restricted keyword
 * - Username contains >1 underscore
 * - Username contains non-letters, non-numbers, and non-underscores
 * - Username is <4 characters
 * - Username is >24 characters
 * @param {ParsedConfig} _
 * @param {string} username
 * @returns {string | true} Returns an error message or true if no error was found.
 */
function usernameCheck(_: ParsedConfig, username: string): string | true {
  const onlyNumbersLettersOneUnderscore = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;

  if (username === "false") {
    return "Your username is a restricted keyword!";
  } else if (username.split("_").length > 2) {
    return "Your username may only contain one underscore!";
  } else if (!onlyNumbersLettersOneUnderscore.test(username)) {
    return "Your username may only contain letters, numbers, and one underscore.";
  } else if (username.length < 4) {
    return "Your username must be at least 4 characters";
  } else if (username.length > 24) {
    return "Your username cannot be longer than 24 characters";
  } else {
    return true;
  }
}

/**
 * Checks the password for a few issues:
 * - Password contains spaces
 * - Password is not strong (one uppercase letter, one lowercase letter, one number, and one special character is required)
 * - Password is <8 characters
 * - Username is >32 characters
 * @param {ParsedConfig} _
 * @param {string} username
 * @returns {string | true} Returns an error message or true if no error was found.
 */
function passwordCheck(_: ParsedConfig, password: string): string | true {
  const noSpaces = /^[^\s]+$/; // does not allow spaces

  if (!noSpaces.test(password)) {
    return "Your password may not contain spaces!";
  } else if (!isStrongPassword(password)) {
    return "Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character.";
  } else if (password.length < 8) {
    return "Your password must be at least 8 characters!";
  } else if (password.length > 32) {
    return "Your password may not be longer than 32 characters!";
  } else {
    return true;
  }
}

/**
 * Checks if the password is strong based on the following validation queries:
 * - At least 1 special character
 * - At least one uppercase character
 * - At least one number
 * @param {string} password
 * @returns {boolean}
 */
function isStrongPassword(password: string): boolean {
  const hasSpecialCharacter = /[!@#$%^&*()]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasSpecialCharacter && hasUppercase && hasLowercase && hasNumber;
}
