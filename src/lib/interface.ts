export interface SessionSecret {
  username: string;
  expiration: number;
}

export interface AuthConfig {
  protectedRoutes?: string[]; // Default: none - These are routes that only signed in users can access
  callbackRoute?: string; // Default: "/login" - This is the route that you will be sent to when not logged in
  callbackRedirect?: string | false; // Default: false - If a string is provided, that is where you will be sent to when trying to access the callback route while signed in
  headerName?: string; // Default: next_authenticator - This is where the username will be provided as a header. This header can be used in your API routes. The value will either be the username or "false".
  cookieName?: string; // Default: NEXT_AUTHENTICATOR_COOKIE - This is the name of the cookie where session data will be stored in on the client. It does not affect functionality, just make sure it doesn't conflict with another cookie.
  cookieExpiration?: number;
  secure?: boolean;
  mongo_uri: string; // This is your MongoDB uri. It is recommended that you store it as an environmental variable for maximum security.
  session_private_key: string; // You must generate a 32 character password (minimum) for use in the session sealing/unsealing. Do not share the session key with anyone else, or else they will be able to access any account. Additionally, it is recommended that this is stored as an environmental variable.
}

export interface ParsedConfig {
  protectedRoutes: string[];
  callbackRoute: string;
  secure: boolean;
  callbackRedirect: string | false;
  headerName: string;
  cookieExpiration: number;
  cookieName: string;
  mongo_uri: string;
  session_private_key: string;
}
