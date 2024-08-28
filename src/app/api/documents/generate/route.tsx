import { NextResponse } from "next/server";
import { documentSchema } from "@/schemas/document.schema";

const CryptoJS = require("crypto-js");

import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const result = documentSchema.safeParse(body);

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

    const uuid = uuidv4();
    const word = CryptoJS.enc.Utf8.parse(uuid);
    const iv = CryptoJS.enc.Base64.stringify(word);

    const messageEncrypt = CryptoJS.AES.encrypt(data.content, data.key, { iv }).toString();

    return NextResponse.json(
      {
        status: 1,
        message: "El documento fue generado correctamente",
        name: data.name,
        content: messageEncrypt,
        key: data.key,
        iv: iv
      }
    );

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