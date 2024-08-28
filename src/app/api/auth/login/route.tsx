import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { authSchema } from "@/schemas/auth.schema";

import User from "@/models/User";

var bcrypt = require("bcryptjs");

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const result = authSchema.safeParse(body);

    if (!result.success) {

      return NextResponse.json({
        status: 0,
        message: result.error,
      });

    }

    const data = result.data;

    const usuario_bd = await User.findOne({
      where: {
        username: data.username
      }
    });

    if (usuario_bd) {

      const id = usuario_bd?.id;
      const pwd_db = usuario_bd?.password;

      if (bcrypt.compareSync(data.password, pwd_db)) {

        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: data.username + "@localhost.com",
            username: data.username,
          },
          String(process.env.NEXT_PUBLIC_JWT_SECRET_KEY)
        );

        const response = NextResponse.json({
          status: 1,
          token: token,
          message: "El token se genero correctamente",
        });

        response.cookies.set({
          name: String(process.env.NEXT_PUBLIC_COOKIE_NAME),
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 30,
          path: "/",
        });

        return response;

      } else {

        return NextResponse.json({
          status: 401,
          message: "La clave es incorrecta",
        });

      }

    } else {

      return NextResponse.json({
        status: 401,
        message: "El usuario no existe",
      });

    }

  } catch (error: any) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 401,
      }
    );

  }

}