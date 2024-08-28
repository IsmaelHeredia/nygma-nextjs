import { NextResponse } from "next/server";

const CryptoJS = require("crypto-js");

export async function POST(request: Request) {

    try {

        const formData = await request.formData();

        const htmlFile: any = formData.get("htmlFile");
        const password: any = formData.get("password");

        if (!htmlFile) {

            return NextResponse.json(
                {
                    message: "El archivo HTML es obligatorio",
                },
                {
                    status: 400,
                }
            );

        }

        if (!password) {

            return NextResponse.json(
                {
                    message: "La clave es obligatoria",
                },
                {
                    status: 400,
                }
            );

        }

        const content = Buffer.from(await htmlFile.arrayBuffer()).toString();

        const findEncryptedMessage = content.match("const message = \"(.*)\"");
        const encryptedMessage = findEncryptedMessage ? findEncryptedMessage[1] : "";

        const findIV = content.match("const iv = \"(.*)\"");
        const iv = findIV ? findIV[1] : "";

        const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, password, { iv: iv }).toString(CryptoJS.enc.Utf8);

        if (decryptedMessage != "") {

            return NextResponse.json({
                status: 1,
                message: "El archivo fue importado correctamente",
                content: decryptedMessage,
                password: password,
            });

        } else {

            return NextResponse.json({
                status: 0,
                message: "La clave es incorrecta",
            });

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