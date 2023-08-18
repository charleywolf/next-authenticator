import { NextResponse } from "next/server";

const Success = (): NextResponse => {
  return NextResponse.json({ status: 200 });
};

const InternalServerError = (): NextResponse => {
  return NextResponse.json({ status: 500 });
};

const Unauthorized = (): NextResponse => {
  return NextResponse.json({ status: 401 }); // client provides no credentials or invalid credentials
};

const Forbidden = (): NextResponse => {
  return NextResponse.json({ status: 403 }); // client has valid credentials but not enough privileges to perform an action on a resource
};

export { Forbidden, Unauthorized, InternalServerError, Success };
