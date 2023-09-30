import { NextResponse } from "next/server";

/**
 * Returns a NextResponse with a success status, and a message if provided
 * @param {string} [message]
 * @returns {NextResponse}
 */
const Success = (message?: string): NextResponse => {
  if (message) {
    return NextResponse.json({ message }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Success" }, { status: 200 });
  }
};

/**
 * Returns a NextResponse with a internal server error status, and an error if provided
 * @param {string} [error]
 * @returns {NextResponse}
 */
const InternalServerError = (error?: string): NextResponse => {
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

/**
 * Returns a NextResponse with a unauthorized status, and an error if provided
 * @param {string} [error]
 * @returns {NextResponse}
 */
const Unauthorized = (error?: string): NextResponse => {
  // client provides no credentials or invalid credentials
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};

/**
 * Returns a NextResponse with a forbidden status, and an error if provided
 * @param {string} [error]
 * @returns {NextResponse}
 */
const Forbidden = (error?: string): NextResponse => {
  // client has valid credentials but not enough privileges to perform an action on a resource
  if (error) {
    return NextResponse.json({ error }, { status: 403 });
  } else {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
};

/**
 * Returns a NextResponse with a not found statusd
 * @returns {NextResponse}
 */
const NotFound = (): NextResponse => {
  return NextResponse.json({ error: "Page Not Found" }, { status: 404 });
};

/**
 * Returns a NextResponse with a bad request status, and an error if provided
 * @param {string} [error]
 * @returns {NextResponse}
 */
const BadRequest = (error?: string): NextResponse => {
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  } else {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};

export {
  Forbidden,
  Unauthorized,
  InternalServerError,
  Success,
  BadRequest,
  NotFound,
};
