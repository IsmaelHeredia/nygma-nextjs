import { NextResponse } from "next/server";
import User from "@/models/User";
import { accountSchema } from "@/schemas/account.schema";
import { generatePassword } from "@/libs/helper";

var bcrypt = require("bcryptjs");

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const result = accountSchema.safeParse(body);

    if (!result.success) {

      return NextResponse.json(
        {
          message: result.error,
        },
        {
          status: 400
        }
      );

    }

    const data = result.data;

    const usuario_bd = await User.findOne({
      where: {
        username: data.username
      }
    });

    if (usuario_bd) {

      const pwd_db = usuario_bd?.password;

      if (bcrypt.compareSync(data.password, pwd_db)) {

        const new_password = generatePassword(data.new_password);

        usuario_bd.username = data.new_username;
        usuario_bd.password = new_password;

        await usuario_bd.save();

        return NextResponse.json({
          status: 1,
          message: "Los datos fueron actualizados correctamente",
        });

      } else {

        return NextResponse.json(
          {
            message: "La clave es incorrecta",
          },
          {
            status: 200,
          }
        );

      }

    } else {

      return NextResponse.json(
        {
          message: "El usuario no existe",
        },
        {
          status: 200,
        }
      );

    }

  } catch (error: any) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}