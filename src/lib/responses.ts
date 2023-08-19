import { NextResponse } from "next/server";

const Success = (message?: string): NextResponse => {
  if (message) {
    return NextResponse.json({ message: message }, { status: 200 });
  } else {
    return NextResponse.json({ status: 200 });
  }
};

const InternalServerError = (error?: string): NextResponse => {
  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } else {
    return NextResponse.json({ status: 500 });
  }
};

const Unauthorized = (error?: string): NextResponse => {
  // client provides no credentials or invalid credentials
  if (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } else {
    return NextResponse.json({ status: 401 });
  }
};

const Forbidden = (error?: string): NextResponse => {
  // client has valid credentials but not enough privileges to perform an action on a resource
  if (error) {
    return NextResponse.json({ error: error }, { status: 403 });
  } else {
    return NextResponse.json({ status: 403 });
  }
};

const BadRequest = (error?: string): NextResponse => {
  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  } else {
    return NextResponse.json({ status: 400 });
  }
};

export { Forbidden, Unauthorized, InternalServerError, Success, BadRequest };
