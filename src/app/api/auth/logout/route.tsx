import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request: Request) {

  const cookieStore = cookies();

  const token = cookieStore.get(String(process.env.NEXT_PUBLIC_COOKIE_NAME));

  if (!token) {

    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    });

  }

  try {

    cookieStore.delete(String(process.env.NEXT_PUBLIC_COOKIE_NAME));

    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    return response;

  } catch (error: any) {

    return NextResponse.json(error.message, {
      status: 500,
    });

  }
}