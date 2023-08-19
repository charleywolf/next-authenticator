## Configuration Options

Next-Authenticator provides numerous options for configurations to tailor the package to your specific project's needs. If you would like another configuration option to be added, feel free to open up an issue on our GitHub.

| Parameter             | Type              | Default                     | Description                                                                                                                                                        |
| --------------------- | ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------ |
| `protectedRoutes``    | `string[]`        | `[]`                        | An array of routes that only authenticated users can access.                                                                                                       |
| `callbackRoute`       | `string`          | `/login`                    | The route to which users will be redirected when not logged in.                                                                                                    |
| `callbackRedirect`    | `string \| false` | `false`                     | If provided, specifies where users will be redirected when attempting to access the callback route while already signed in. Set to `false` to disable redirection. |
| `headerName`          | `string`          | `next_authenticator`        | The name of the header where the username will be provided.                                                                                                        |
| `cookieName`          | `string`          | `NEXT_AUTHENTICATOR_COOKIE` | The name of the cookie where session data will be stored on the client.                                                                                            |
| `cookieExpiration`    | `number`          | `7 * 24 * 60 * 60 * 1000`   | The duration (in milliseconds) for which authentication cookies will last.                                                                                         |
| `secure`              | `boolean`         | `true`                      | Determines whether the authentication cookies should be secure (HTTPS only).                                                                                       |
| `mongo_uri`           | `string`          |                             | **Required** The MongoDB URI used for authentication data storage.                                                                                                 |
| `mongoDatabase`       | `string`          | `main`                      | The MongoDB database used for authentication data storage.                                                                                                         |
| `mongoCollection`     | `string`          | `accounts`                  | The MongoDB collection used for authentication data storage.                                                                                                       |
| `session_private_key` | `string`          |                             | **Required** A 32-character password (minimum) used for session sealing/unsealing.                                                                                 |
| `ignoredRoutes`       | `RegExp`          | `/((?!\_next\/static        | \_next\/image                                                                                                                                                      | favicon\.ico).\*)/` | These are routes that will be completely ignored by the authentication system, written in regex. |

### Additional Remarks

- For the `headerName` parameter, the value of this header will either be the username of the authenticated user or `false`.
- In the `cookieExpiration` parameter, it is advised to use a lesser amount of time than usual because you cannot invalidate cookies.
- **SECURITY RECOMMENDATION:** Store `mongo_uri` and `session_private_key` as environmental variables for security.
- In the `ignoredRoutes` parameter, the regex defines routes that will be ignored by the authentication system.
