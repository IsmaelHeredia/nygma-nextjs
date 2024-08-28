import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request: Request) {

  const cookieStore = cookies();

  const token = cookieStore.get(String(process.env.NEXT_PUBLIC_COOKIE_NAME));

  if (!token) {

    return NextResponse.json({
      status: 401,
      message: "No se encontro el token",
    });

  }

  const decoded = jwt.verify(token.value, String(process.env.NEXT_PUBLIC_JWT_SECRET_KEY));

  return NextResponse.json(decoded);

}