# Next-Authenticator

This package can be used along with a [MongoDB database](https://www.mongodb.com/atlas/database) to provide an easy-to-use authentication system for your Next.js app. Please refer to the usage guide for implementation. _Only compatible with app dir projects._

## Prerequisites

You need to generate/obtain the following before using this package:

- A MongoDB URI, which you can get after creating a free database on [their website](https://www.mongodb.com/atlas/database).
- A private key for encryption (minimum 32 digits), which you can generate on (random.org)[https://www.random.org/passwords/?num=1&len=32&format=plain&rnd=new]. This is used to encrypt your session cookies, so it is crucial to keep it secure and confidential.

**Security Note:** Store these variables as an environmental variable in a `.env` file.

## Usage/Examples

### Middleware Implementation (middleware.ts/middleware.js)

This file is either in the root directory, or the src directory if applicable.

```typescript
// This middleware will protect your routes and handle callbackRedirect if enabled

import { authenticatorMiddleware } from "next-authenticator";
import { NextRequest } from "next/server";
import { AuthenticatorConfig } from "./config";

export default function middleware(request: NextRequest) {
  return authenticatorMiddleware(AuthenticatorConfig, request);
}
```

### Configuration (config.ts/config.js)

This file can be located anywhere in your project, as long as all your files using the package can access it.

```typescript
import { AuthConfig } from "next-authenticator/lib/interface";

if (!process.env.MONGO_URI || !process.env.SESSION_PRIVATE_KEY) {
  throw Error("Missing required environmentals for next-authenticator!");
}

/*
    For more information on any of these configuration options, view the configuration sections of the docs.
*/
export const AuthenticatorConfig: AuthConfig = {
  mongo_uri: process.env.MONGO_URI, // Required - Mongo URI for your database (view prerequisites on github readme for more)
  session_private_key: process.env.SESSION_PRIVATE_KEY, // Required - Private key for encrypting session (view prerequisites on github readme for more)
  // protectedRoutes: [], // An array of routes that only authenticated users can access.
  // callbackRoute: "/login", // The route to which users will be redirected when not logged in.
  // callbackRedirect: false, // If provided, specifies where users will be redirected when attempting to access the callback route while already signed in. Set to false to disable redirection.
  // headerName: "next_authenticator", // The name of the header where the username will be provided.
  // cookieName: "NEXT_AUTHENTICATOR_COOKIE", // The name of the cookie where session data will be stored on the client.
  // cookieExpiration: 7 * 24 * 60 * 60 * 1000, // The duration (in milliseconds) for which authentication cookies will last.
  // secure: true, // Determines whether the authentication cookies should be secure (HTTPS only).
  // mongoDatabase: "main", // The MongoDB database used for authentication data storage.
  // mongoCollection: "accounts", // The MongoDB collection used for authentication data storage.
  // ignoredRoutes: /((?!_next\/static|_next\/image|favicon\.ico).)*/, // These are routes that will be completely ignored by the authentication system, written in regex.
};
```

## Configuration Options

Next-Authenticator provides numerous options for configurations to tailor the package to your specific project's needs. If you would like another configuration option to be added, feel free to open up an issue on our GitHub.

| Parameter             | Type              | Default                     | Description                                                                                                     |
| --------------------- | ----------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `mongo_uri`           | `string`          |                             | **Required.** The MongoDB URI used for authentication data storage.                                              |
| `session_private_key` | `string`          |                             | **Required.** A 32-character password (minimum) used for session sealing/unsealing.                            |
| `protectedRoutes`     | `string[]`        | `[]`                        | An array of routes that only authenticated users can access.                                                    |
| `callbackRoute`       | `string`          | `/login`                    | The route to which users will be redirected when not logged in.                                                 |
| `callbackRedirect`    | `string \| false` | `false`                     | If provided, specifies where users will be redirected when attempting to access the callback route while already signed in. Set to `false` to disable redirection. |
| `headerName`          | `string`          | `next_authenticator`        | The name of the header where the username will be provided.                                                     |
| `cookieName`          | `string`          | `NEXT_AUTHENTICATOR_COOKIE` | The name of the cookie where session data will be stored on the client.                                         |
| `cookieExpiration`    | `number`          | `7 * 24 * 60 * 60 * 1000`   | The duration (in milliseconds) for which authentication cookies will last.                                      |
| `secure`              | `boolean`         | `true`                      | Determines whether the authentication cookies should be secure (HTTPS only).                                    |
| `mongoDatabase`       | `string`          | `main`                      | The MongoDB database used for authentication data storage.                                                      |
| `mongoCollection`     | `string`          | `accounts`                  | The MongoDB collection used for authentication data storage.                                                    |
| `ignoredRoutes`       | `RegExp`          | `/((?!\_next\/static        | \_next\/image                                                                                                  | favicon\.ico).\*)/` | These are routes that will be completely ignored by the authentication system, written in regex.            |

#### Additional Remarks

- For the `headerName` parameter, the value of this header will either be the username of the authenticated user or `false`.
- In the `cookieExpiration` parameter, it is advised to use a lesser amount of time than usual because you cannot invalidate cookies.
- **Security Note:** Store `mongo_uri` and `session_private_key` as environmental variables for security.
- In the `ignoredRoutes` parameter, the regex defines routes that will be ignored by the authentication system.
