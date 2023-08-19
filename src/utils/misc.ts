export function throwError(location: string, message: unknown): void {
  if (typeof message === "string") {
    console.error(`An error has occured at ${location}: ${message}`);
  } else {
    console.error(`An unknown error has occured at ${location}.`);
  }
}

export function getError(location: string, message: unknown): string {
  if (typeof message === "string") {
    return `An error has occured at ${location}: ${message}`;
  } else {
    return `An unknown error has occured at ${location}.`;
  }
}
