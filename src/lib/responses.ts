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
    return NextResponse.json({ status: 200 });
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
    return NextResponse.json({ status: 500 });
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
    return NextResponse.json({ status: 401 });
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
    return NextResponse.json({ status: 403 });
  }
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
    return NextResponse.json({ status: 400 });
  }
};

export { Forbidden, Unauthorized, InternalServerError, Success, BadRequest };
