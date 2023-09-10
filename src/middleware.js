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

    console.log(token);
    if (!token) {
      // const url = request.nextUrl.clone();
      // url.pathname = "/clinician/login";
      console.log("Redirecting", pathName);

      return NextResponse.redirect(new URL("/clinician/login", request.url));
    }

    //check if there is a jwt token
    //check if it is expired
    //not valid -- redirect to login
    //valid -- redired to dashboard
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
