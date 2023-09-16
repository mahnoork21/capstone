import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/clinician/login",
  "/clinician/register",
  "/clinician/home",
];

export function middleware(request) {
  const pathName = request.nextUrl.pathname;

  //Everything except public routes is protected
  if (!publicRoutes.includes(pathName) && pathName.includes("/clinician")) {
    const token = request.cookies.get("userToken");

    if (!token) {
      return NextResponse.redirect(new URL("/clinician/login", request.url));
    }

    //TODO: check if it is expired
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
