/**
 * Logs an error message to the console without throwing an error/disrupting the server
 * @param {string} location
 * @param {unknown} message
 * @returns {void}
 */
export function throwError(location: string, message: unknown): void {
  if (typeof message === "string") {
    console.error(`An error has occured at ${location}: ${message}`);
  } else if (message && typeof message === "object" && "message" in message) {
    console.error(`An error has occured at ${location}: ${message.message}`);
    if ("stack" in message) {
      console.error(message.stack);
    }
  } else {
    console.error(`An unknown error has occured at ${location}.`);
  }
}

/**
 * Generates and returns an error message regarding the location of the error and the provided message
 * @param {string} location
 * @param {string} message
 * @returns {string}
 */
export function getError(location: string, message: unknown): string {
  if (typeof message === "string") {
    return `An error has occured at ${location}: ${message}`;
  } else if (message && typeof message === "object" && "message" in message) {
    return `An error has occured at ${location}: ${message.message}`;
  } else {
    return `An unknown error has occured at ${location}.`;
  }
}
