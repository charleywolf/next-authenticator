export function throwError(location: string, message: string): void {
  console.error(`An error has occured at ${location}: ${message}`);
}
