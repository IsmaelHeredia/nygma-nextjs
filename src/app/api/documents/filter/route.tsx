import { NextResponse } from "next/server";
import Document from "@/models/Document";
import { Op } from "sequelize";

export async function POST(request: Request) {

    const data = await request.json();

    const name = data.name ? data.name : "";
    const page = data.page ? data.page : 1;

    try {

        let limit = 10;
        let offset = 0 + (page - 1) * limit;

        const documentosList = await Document.findAndCountAll({
            where: {
                name: { [Op.regexp]: name }
            },
            offset: offset,
            limit: limit,
            order: [["updated_at", "DESC"]],
        });

        const documents = documentosList.rows;
        const count = documentosList.count;
        const last_page = Math.ceil(count / limit);

        return NextResponse.json(
            {
                status: 1,
                documents: documentosList ? documents : [],
                total: count,
                last_page: last_page,
                current_page: page
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