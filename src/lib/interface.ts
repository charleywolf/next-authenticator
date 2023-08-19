export interface SessionSecret {
  username: string;
  expiration: number;
}

/**
 * Configuration options for the package.
 */
export interface AuthConfig {
  /**
   * An array of routes that only authenticated users can access.
   * @default none
   */
  protectedRoutes?: string[];

  /**
   * The route to which users will be redirected when not logged in.
   * @default "/login"
   */
  callbackRoute?: string;

  /**
   * Specifies where users will be redirected when attempting to access the callback route while already signed in. Set to `false` to disable redirection.
   * @default false
   */
  callbackRedirect?: string | false;

  /**
   * The name of the header where the username will be provided. This header can be used in your API routes.
   * @remarks For reference in your api routes, the value of this header will either be the username of the authenticated user or `false`.
   * @default "next_authenticator"
   */
  headerName?: string;

  /**
   * The name of the cookie where session data will be stored on the client.
   * @default "NEXT_AUTHENTICATOR_COOKIE"
   * @remarks It does not affect functionality, but ensure it doesn't conflict with other cookies.
   */
  cookieName?: string;

  /**
   * The duration (in milliseconds) for which authentication cookies will last.
   * @remarks It is advised to use a lesser amount of time than usual due to the inability to invalidate cookies.
   * @default 7 * 24 * 60 * 60 * 1000
   */
  cookieExpiration?: number;

  /**
   * Determines whether the authentication cookies should be secure (HTTPS only).
   * @default true
   */
  secure?: boolean;

  /**
   * The MongoDB URI used for authentication data storage.
   * @remarks SECURITY RECOMMENDATION: Store this as an environmental variable.
   */
  mongoUri: string;

  /**
   * The MongoDB database used for authentication data storage.
   * @default main
   */
  mongoDatabase: string;

  /**
   * The MongoDB collection used for authentication data storage.
   * @default accounts
   */
  mongoCollection: string;

  /**
   * A 32-character password (minimum) used for session sealing/unsealing. It must not be shared with anyone else to maintain account security.
   * @remarks SECURITY RECOMMENDATION: Store this as an environmental variable.
   */
  session_private_key: string;
  /**
   * These are routes that will be completely ignored by the authentication system, written in regex. By default, this will include `_next/static`, `_next/image`, and `favicon.ico`.
   * @remarks In the regex, routes that DO NOT match must be the ones that are ignored. Regular routes will match.
   * @default /((?!_next\/static|_next\/image|favicon\.ico).*)/
   */
  ignoredRoutes?: RegExp;
}

type usernameCheckFunction = (
  config: ParsedConfig,
  username: string,
) => Promise<string | true> | (string | true);

type passwordCheckFunction = (
  config: ParsedConfig,
  password: string,
) => Promise<string | true> | (string | true);

export interface passwordCheckObject {
  function: passwordCheckFunction;
  type: "password";
}

export interface usernameCheckObject {
  function: usernameCheckFunction;
  type: "username";
}

export interface ParsedConfig {
  protectedRoutes: string[];
  callbackRoute: string;
  secure: boolean;
  callbackRedirect: string | false;
  headerName: string;
  cookieExpiration: number;
  cookieName: string;
  mongoUri: string;
  mongoDatabase: string;
  mongoCollection: string;
  session_private_key: string;
  ignoredRoutes: RegExp;
}
