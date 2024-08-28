import { NextResponse } from "next/server";
import Document from "@/models/Document";
import { documentSchema } from "@/schemas/document.schema";

const CryptoJS = require("crypto-js");

import { v4 as uuidv4 } from "uuid";

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Props) {

  try {

    const document = await Document.findByPk(params.id);

    if (!document) {

      return NextResponse.json(
        {
          message: "El documento no existe",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json(
      {
        status: 1,
        document: document
      }
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500
      }
    );

  }

}

export async function PUT(request: Request, { params }: Props) {

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

    const document = await Document.findByPk(params.id);

    if (!document) {

      return NextResponse.json(
        {
          message: "El documento no existe",
        },
        {
          status: 404,
        }
      );

    }

    const uuid = uuidv4();
    const word = CryptoJS.enc.Utf8.parse(uuid);
    const iv = CryptoJS.enc.Base64.stringify(word);

    document.name = data.name;
    document.content = data.content;
    document.key = data.key;
    document.iv = iv;

    await document.save();

    return NextResponse.json(
      {
        status: 1,
        message: "El documento fue actualizado",
        document: document
      }
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500
      }
    );

  }

}

export async function DELETE(request: Request, { params }: Props) {

  const id = params.id;

  try {

    const document = await Document.findByPk(id);

    if (!document) {

      return NextResponse.json(
        {
          message: "El documento no existe",
        },
        {
          status: 404,
        }
      );

    }

    await Document.destroy({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        status: 1,
        message: "El documento fue borrado",
        id: id
      }
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500
      }
    );

  }

}