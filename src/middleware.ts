import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {

  const url = request.nextUrl.pathname;

  const apiUrl = url.includes("/api") ? true : false;

  var jwt = "";

  if (apiUrl) {
    const auth = request.headers.get("Authorization");
    if (auth.startsWith("Bearer")) {
      jwt = auth.slice(7, auth.length);
    }
  } else {
    const cookie = request.cookies.get(String(process.env.NEXT_PUBLIC_COOKIE_NAME));
    jwt = cookie ? cookie.value : "";
  }

  if (!jwt) {
    if (apiUrl) {
      return Response.json({ status: 0, message: "Access denied" }, { status: 401 });
    } else {
      if (url != "/") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  if (jwt) {
    if (url == "/") {
      try {
        await jwtVerify(jwt, new TextEncoder().encode(String(process.env.NEXT_PUBLIC_JWT_SECRET_KEY)));
        return NextResponse.redirect(new URL("/documentos", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  try {

    const decoded = await jwtVerify(
      jwt,
      new TextEncoder().encode(String(process.env.NEXT_PUBLIC_JWT_SECRET_KEY))
    );

    return NextResponse.next();

  } catch (error) {

    if (apiUrl) {
      return Response.json({ status: 0, message: "Access denied" }, { status: 401 });
    } else {
      if (url != "/") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

  }

}

export const config = {
  matcher: [
    "/api/auth/profile/:path*",
    "/api/auth/logout/:path*",
    "/api/cuenta/:path*",
    "/api/documents/:path*",
    "/",
    "/documentos/:path*"
  ],
};